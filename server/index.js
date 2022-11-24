// Tutorial de sockets: https://www.youtube.com/watch?v=djMy4QsPWiI&ab_channel=PedroTech
// npm install express cors nodemon socket.io
const express = require('express');
const app = express();
const http = require('http');
const{Server} = require('socket.io');
const cors = require('cors');
const { json } = require('express');
app.use(cors());

const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

let partidasCreadas = [];
io.on("connection", (socket) => {
    console.log(`Nuevo cliente conectado! ${socket.id}`);

    socket.on("test", (data) => {
        console.log(data);
        socket.to(data.room).emit("broad_msg", data); // envia un mensaje a todos los clientes conectados a un room
        //socket.broadcast.emit("broad_msg", data); // envia un mensaje a todos los clientes conectados
    });

    socket.on("join", (data) => { //se une a una sala especifica
        console.log("server join");
        console.log(data);
        let valido= verificarSala(data);
        if(valido){
            socket.join(data.room);
            console.log(`Se unio a la sala ${data.room}`);
            io.emit("actualizarPartidas", partidasCreadas);
            socket.to(data.room).emit("userJoined", getPartida(data.room));
            socket.emit("irLobby", getPartida(data.room));
        }else{
            console.log("no se unio a la sala");
            socket.emit("notJoined", "false");
        }
    });

    socket.on("iniciarJuego", (data) => {
        console.log("iniciarJuego");
        console.log(data);
        ubicarJugadores(data);
        socket.to(data.state.codigo).emit("iniciarJuego", data);
    });


    ubicarJugadores = (data) => {
        //ubicar jugadores en tablero

        let partida = data.state;
        let jugadores = partida.jugadores;
        let tablero = partida.tablero;
        let contador = 0;
        for(let i = 0; i < tablero.length; i++){
            for(let j = 0; j < tablero[i].length; j++){
                if(tablero[i][j][0] === "3" && contador < jugadores.length){
                    console.log("jugador: "+jugadores[contador][3]);
                    tablero[i][j] = jugadores[contador];
                    jugadores[contador][3].posicion = {x: i, y: j};
                    console.log(jugadores[contador]);
                    //io.to(jugadores[contador][1]).emit("ubicarJugador", {x: i, y: j});
                    contador++;
                }
            }
        }
        partida.tablero = tablero;
        partida.jugadores = jugadores;  
        partida.estado = "activa";
        actualizarPartida(partida);
        //cambiar elemento de partida en partidasCreadas
       /* for(let i = 0; i < partidasCreadas.length; i++){
            let partidaTemp = JSON.parse(partidasCreadas[i].partida).state;
            console.log(partidaTemp);
            if(partidaTemp.codigo === partida.codigo){
                partidasCreadas[i].partida = JSON.stringify({state: partida});
                io.to(partida.codigo).emit("actualizarPartida", partida);
            }
        }*/

        console.log(partidasCreadas);
    }


    actualizarPartida = (partida) => {
        //actualizar partida en partidasCreadas
        for(let i = 0; i < partidasCreadas.length; i++){
            let partidaTemp = JSON.parse(partidasCreadas[i].partida).state;
            //console.log(partidaTemp);
            if(partidaTemp.codigo === partida.codigo){
                partidasCreadas[i].partida = JSON.stringify({state: partida});
                io.to(partida.codigo).emit("actualizarPartida", partida);
            }
        }
    }

    socket.on("mover", (data) => {
        console.log("mover");
        let direcciones ={"w": {x: -1, y: 0}, "s": {x: 1, y: 0}, "a": {x: 0, y: -1}, "d": {x: 0, y: 1}};
        console.log("[user]", socket.id, "[partida]", data.partida, "[direccion]", data.direccion);
        let partida = getPartida(data.partida);
        console.log(partida);
        let tablero = partida.tablero;
        let jugadores = partida.jugadores;
        jugadores.forEach((jugador) => {
            if(jugador[1] === socket.id){
                let x = jugador[3].posicion.x;
                let y = jugador[3].posicion.y;
                let direccion = direcciones[data.direccion];
                let x2 = x + direccion.x;
                let y2 = y + direccion.y;
                console.log("siguiente: ",tablero[x2][y2], "tipo: ", typeof(tablero[x2][y2]));
                if(typeof(tablero[x2][y2]) === "object"){
                    console.log("jugador");
                    x2 = x2 + direccion.x;
                    y2 = y2 + direccion.y;
                }
                if(["1", "2", "3"].includes(tablero[x2][y2][0]) ){
                    console.log("se puede mover");
                    tablero[x][y] = partida.matriz[x][y];
                    tablero[x2][y2] = jugador;
                    jugador[3].posicion = {x: x2, y: y2};
                    partida.tablero = tablero;

                    let tail = partida.matriz[x2][y2].slice(1);
                    let sentidoCorrecto = tail.includes(data.direccion);
                 
                    socket.emit("actualizarSentido", sentidoCorrecto);
                    if(partida.matriz[x2][y2][0] === "2" && data.direccion === partida.matriz[x2][y2][1]){
                        console.log("vuelta completa");
                        jugador[3].vueltasCompletas++;
                        jugador[3].sentido = true;
                        console.log(jugador[3].vueltasCompletas);
                    }
                    else if(partida.matriz[x2][y2][0] === "3" && partida.matriz[x][y][0] === "2"){
                        console.log("meta reversa");
                        if(jugador[3].sentido){
                            jugador[3].vueltasCompletas--;
                            jugador[3].sentido = false;
                        }
                        console.log(jugador[3].vueltasCompletas);
                    }
                    partida.jugadores = jugadores;
                    tablero[x2][y2] = jugador;
                    
                    console.log(partida.vueltas)
                    //if(jugador[3].vueltasCompletas === partida.vueltas){
                    if(jugador[3].vueltasCompletas === 1){
                        console.log("vueltas completas");
                        partida.posiciones.push(jugador);
                        console.log(partida.posiciones);
                        //remover jugador del tablero
                        //tablero[x2][y2] = partida.matriz[x2][y2];
                    }
                    actualizarPartida(partida);



                        /*console.log("ganador");
                        io.to(partida.codigo).emit("ganador", jugador);*/
                
                }
            }
        });
        //console.log(partida);
      

    });



    socket.on("cerrarLobby", (data) => {
        console.log("cerrarLobby");
        //cambiar estado de la partida a "cerrada"
        partidasCreadas.forEach((partida, index) => {
            console.log(partida);
            console.log(index);
            let partidaJson = JSON.parse(partida.partida).state;
            if(partidaJson.codigo == data){
                partidaJson.estado = "activa";
                partida.partida = JSON.stringify({state: partidaJson});
                partidasCreadas[index] = partida;
                io.emit("actualizarPartidas", partidasCreadas);
                io.to(data).emit("irPartida", partida);
            }

        });
    });

    
    getPartida = (codigo) => {
        let partida = null;
        partidasCreadas.forEach((partidaC) => {
            let partidaJ = JSON.parse(partidaC.partida).state;
            if(partidaJ.codigo === codigo){
                partida = partidaJ;
            }
        });
        return partida;
    }


    verificarSala = (data) => {
        console.log("verificando sala");
        
        let valido = true;
        partidasCreadas.forEach((partidaC) => {
            let partida = JSON.parse(partidaC.partida).state;
            console.log(partida.codigo);
            if(partida.codigo === data.room && partida.estado === "esperando" && partida.jugadores.length < partida.cantJugadores){
                let usuarioValido = true;
                partida.jugadores.forEach((jugador) => {
                    console.log(jugador[1]);
                    console.log(data.usuario[1]);
                    if(jugador[1] === data.usuario[1]){
                        usuarioValido = false;
                    }else{
                        usuarioValido = true;
                    }
                });
                if(usuarioValido){
                    console.log("usuario valido");
                    partida.jugadores.push(data.usuario);
                    partidaC.partida = JSON.stringify({state: partida});
                    valido = true;
                }else{
                    console.log("usuario no valido");
                    valido = false;
                }
            }else{
                valido = false;
            }
        });
        return valido;
    }


    socket.on("verificarSala", (data) => { //verifica si la sala existe
        if(io.sockets.adapter.rooms.get(data)){
            socket.emit("salaExiste", true);
        }else{
            socket.emit("salaExiste", false);
        }
    });


    socket.on("crearPartida", (data) => {
        console.log("creando partida");
        partidasCreadas.push(data);
        let partida = JSON.parse(data.partida).state;
        console.log(partidasCreadas.length);
        console.log(partida);
        socket.join(partida.codigo);
        socket.emit("partidaCreadaC", partidasCreadas);
        socket.broadcast.emit("partidaCreada", partidasCreadas);
    });

    socket.on("eliminarPartida", (data) => {
        console.log("eliminando partida");
        partidasCreadas.forEach((partida, index) => {
            let partidaJson = JSON.parse(partida.partida).state;
            if(partidaJson.codigo === data){
                partidasCreadas.splice(index, 1);
                io.emit("actualizarPartidas", partidasCreadas);
                io.to(data).emit("partidaEliminada", partida);
            }
        });
    });

    socket.off("obtenerPartidas", () => { //obtiene las partidas disponibles    
        console.log(partidasCreadas);
    });
    socket.on("obtenerPartidas", () => { //obtiene las partidas disponibles
        console.log(partidasCreadas)
        socket.emit("partidas", partidasCreadas);
    });


    socket.on("disconnect", () => {
        console.log(`Cliente desconectado! ${socket.id}`);
        limpiarPartidas(socket.id);
        io.emit("actualizarPartidas", partidasCreadas);

    });

    limpiarPartidas = (id) => {
        console.log("limpiando partidas: " + id);
        let partidas = [];
        partidasCreadas.forEach((partidaC) => {
            let partida = JSON.parse(partidaC.partida).state;
            partida.jugadores.forEach((jugador) => {
                if(jugador[1] === id){
                    if(jugador[2] ==="Creador" && partida.jugadores.length > 1){
                        partida.creador = partida.jugadores[1];
                        partida.jugadores[1][2] = "Creador";
                        io.to(partida.jugadores[1][1]).emit("actualizarTipo", "Creador");
                    }

                    partida.jugadores.splice(partida.jugadores.indexOf(jugador), 1);
                    partidaC.partida = JSON.stringify({state: partida});
                    socket.to(partida.codigo).emit("userLeft", partidaC);

                }
                
            });
            if(partida.jugadores.length > 0){
                partidas.push(partidaC);
            }
        });
        partidasCreadas = partidas;
        console.log(partidasCreadas);
    }


 



}); 

server.listen(3001, () => {
    console.log('listening on *:3001');
});