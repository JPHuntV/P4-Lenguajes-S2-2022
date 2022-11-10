//import './App.css';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001');

function Inicio() {

  //room
  const [room, setRoom] = useState('');

  //mensaje de prueba
  const [message, setMessage] = useState('');
  const [recivido, setRecivido] = useState('');
  const sendMessage = () => {
    socket.emit("test", {message,room});// envia un mensaje al servidor
  };

  const joinRoom = () => {
    if (room !== '') {
      socket.emit("join", room);// se une a una sala especifica
    }
  };

  useEffect(() => {
    socket.on("broad_msg", (data) => {
      //alert(data.message);
      setRecivido(data.message);
    });
  }, []);
  return (
    <div className="App">
      <input placeholder="room" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join</button>
      <input 
        placeholder="mensaje..."
        onChange={(event) =>{
          setMessage(event.target.value);
        }}></input>
      <button onClick={sendMessage}>Enviar</button>
      <h1>Recibido: </h1>
      {recivido}
    </div>
  );
}

export default Inicio;
