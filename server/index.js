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
            }

        });
        io.emit("actualizarPartidas", partidasCreadas);
        io.to(data).emit("irPartida", getPartida(data));
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
            if(partida.codigo === data.room && partida.estado === "esperando"){
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
                    partida.jugadores.splice(partida.jugadores.indexOf(jugador), 1);
                    partidaC.partida = JSON.stringify({state: partida});
                    socket.to(partida.codigo).emit("userLeft", partidaC);

                }
                
            });
            partidas.push(partidaC);
        });
        partidasCreadas = partidas;
        console.log(partidasCreadas);
    }


 



}); 

server.listen(3001, () => {
    console.log('listening on *:3001');
});