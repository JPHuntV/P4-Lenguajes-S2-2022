import React, {Component, useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Partida from "../clases/Partida";

function ListaPartidas(props){
    
    const [usuario, setUsuario] = useState(props.route.params.usuario);
    const [partidas, setPartidas] = useState(props.route.params.partidas);
    const [partida, setPartida] = useState(null);
    
    useEffect(() => {
        console.log("useEffect");
        usuario.getSocket().on("partidaCreada", (partidas) => {
            console.log("partidaCreadaa");
            setPartidas(partidas);
        });

        usuario.getSocket().on("actualizarPartidas", (partidas) => {
            console.log("userJoin");
            setPartidas(partidas);
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
        return partida;
    }
    
    
    const getItemsPartidas = () => {
        let itemsPartidas = [];
        partidas.forEach(partidaTemp => {
            let partidaJson = JSON.parse(partidaTemp.partida).state
            let partida = partidaFromJson(partidaJson);
            console.log(partida.getJugadores());
            
            itemsPartidas.push(
                <View key={partida.getCodigo()}>
                    <Text>{partida.toString()}</Text>
                    <TouchableOpacity onPress={()=> joinRoom(partida)}>
                        <Text>Unirse</Text>
                    </TouchableOpacity>
                </View>
            );
        });
        return itemsPartidas;
    }

    return(
        <View>
            <Text>Estoy en lista de partidas</Text>
            <Text>{usuario.getSocket().id }</Text>
            {getItemsPartidas()}
        </View>
    );
}

export default ListaPartidas;
/*
export default class ListaPartidas extends Component{
    constructor(props) {
        super(props);
        this.state = {
            usuario: props.route.params.usuario,
            partidas: props.route.params.partidas
        };
    }

    partidaFromJson(json){
        let partida = new Partida(json.codigo,json.modo,json.pista,json.vueltas,json.tiempo,json.cantJugadores);
        partida.setCreador(json.creador);
        partida.setJugadores(json.jugadores);
        return partida;
    }
    render(){
        let itemsPartidas = [];
        this.state.partidas.forEach(partidaTemp => {
            let partidaJson = JSON.parse(partidaTemp.partida).state
            let partida = this.partidaFromJson(partidaJson);
            //console.log(partida.getJugadores());
            
            itemsPartidas.push(
                <Text key={partida.getCodigo()}>{partida.toString()}</Text>
            );
        });

        return(
            <View>
                <Text>Estoy en lista de partidas</Text>
                <Text> {this.state.partidas.length}</Text>
                {itemsPartidas}
            </View>
        );
    }
}*/