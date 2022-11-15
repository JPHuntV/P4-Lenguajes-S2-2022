// Tutorial de sockets: https://www.youtube.com/watch?v=djMy4QsPWiI&ab_channel=PedroTech
// npm install express cors nodemon socket.io
const express = require('express');
const app = express();
const http = require('http');
const{Server} = require('socket.io');
const cors = require('cors');
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
        socket.join(data);
        console.log(`Se unio a la sala ${data}`);
    });

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
        console.log(partidasCreadas.length);
        socket.broadcast.emit("partidaCreada", partidasCreadas);
    });

    socket.off("obtenerPartidas", () => { //obtiene las partidas disponibles    
        console.log(partidasCreadas);
    });
    socket.on("obtenerPartidas", () => { //obtiene las partidas disponibles
        console.log(partidasCreadas)
        socket.emit("partidas", partidasCreadas);
    });

}); 
server.listen(3001, () => {
    console.log('listening on *:3001');
});