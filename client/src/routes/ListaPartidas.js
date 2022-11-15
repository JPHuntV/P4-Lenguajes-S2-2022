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
    }, []);
    


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
                <Text key={partida.getCodigo()}>{partida.toString()}</Text>
            );
        });
        return itemsPartidas;
    }

    return(
        <View>
            <Text>Estoy en lista de partidas</Text>
            <Text>{usuario.getSocket().id }</Text>
            <Text> {partidas.length}</Text>
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