import React, {Component, useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import Partida from "../clases/Partida";
import * as stylesTemp from "../css/ListaPartidas.css.js";
import TestTablero from "../components/TestTablero";
const styles = stylesTemp.style;

function ListaPartidas(props){
    
    const [usuario, setUsuario] = useState(props.route.params.usuario);
    const [partidas, setPartidas] = useState(props.route.params.partidas);

    
    useEffect(() => {
        console.log("useEffect");
        usuario.getSocket().on("partidaCreada", (partidas) => {
            console.log("partidaCreadaa");
            setPartidas(partidas);
        });

        usuario.getSocket().on("actualizarPartidas", (partidas) => {
            console.log("userJoin");
            setPartidas(partidas);
            console.log(partidas);
            console.log("//////////////////");
        });
        
        usuario.getSocket().on("irLobby", (data) => {
            console.log("ir al lobby");
            let partidaTemp = partidaFromJson(data);
            console.log(partidaTemp);
            props.navigation.navigate("Lobby", {usuario: usuario, partida: partidaTemp});


        });

        usuario.getSocket().on("notJoined", (data) => {
            console.log("notJoined");
            alert("No se pudo unir a la partida");
        });
    }, []);
    

    const joinRoom = (partida) => {
        let room = partida.getCodigo();
        console.log("joinRoom: "+room);
        let socket = usuario.getSocket();
        if (room !== '') {
          socket.emit("join", {room: room, usuario: usuario.toJson()});

        }
    }
    const partidaFromJson = (json) => {
        let partida = new Partida(json.codigo, json.modo, json.pista, json.vueltas, json.tiempo, json.cantJugadores);
        partida.setCreador(json.creador);
        partida.setJugadores(json.jugadores);
        partida.setEstado(json.estado);
        return partida;
    }
    
    
    const getItemsPartidas = () => {
        let itemsPartidas = [];
        partidas.forEach(partidaTemp => {
            let partidaJson = JSON.parse(partidaTemp.partida).state
            let partida = partidaFromJson(partidaJson);
            console.log(partida.getMatriz());
            if(partida.getEstado() == "esperando" && partida.getJugadores().length < partida.getCantJugadores()){
                itemsPartidas.push(
                    <TouchableOpacity  key={partida.getCodigo()} style={styles.gameCard} onPress={()=> joinRoom(partida)}>
                        <View style={styles.gameImage}>
                            <TestTablero partida={partida}/>
                        </View>
                        <View style={styles.gameInfo}>
                            <Text >{partida.getPista()}</Text>
                            <Text >{partida.getModo()}</Text>
                            <Text >{partida.getVueltas()}</Text>
                            {partida.getModo != "Vs" ? <Text >{partida.getTiempo()}</Text> : null}
                            <Text>Jugadores conectados:{partida.getJugadores().length}</Text>
                            <Text>Sala: {partida.getCodigo()}</Text>
                            
                        </View>
                        </TouchableOpacity>

                );
            }
        });
        if(itemsPartidas.length == 0){
            itemsPartidas.push(
            <Text key="noPartidas">No hay partidas disponibles</Text>
            );
        }
        return itemsPartidas;
    }

    return(
        <View style={styles.container}>
            <Text>{usuario.getSocket().id }</Text>
            <View style={styles.head}>
                <Image style={styles.imagenUsuario} source={require("../assets/images/usuario.png")}/>
                <Text style={{fontSize:30}}>{usuario.getNickName()}</Text>
            </View>
            <View style = {styles.gamesContainer}>
            {getItemsPartidas()}
            </View>
        </View>
    );
}

export default ListaPartidas;
