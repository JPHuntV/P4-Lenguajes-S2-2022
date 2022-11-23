import React, {Component, useEffect, useState} from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Partida from "../clases/Partida";
function Lobby(props) {

    const [usuario, setUsuario] = useState(props.route.params.usuario);
    const [partida, setPartida] = useState(props.route.params.partida);
    const [jugadores, setJugadores] = useState(props.route.params.partida.getJugadores());
    const [ultimoJugador, setUltimoJugador] = useState(null);
    useEffect(() => {
        console.log("useEffect");
        usuario.getSocket().on("userJoined", (partidaTemp) => {
            console.log("userJoin");
         
            let partidaObj = new Partida(partidaTemp.codigo, partidaTemp.modo, partidaTemp.pista, partidaTemp.vueltas, partidaTemp.tiempo, partidaTemp.cantJugadores);
            partidaObj.setCreador(partidaTemp.creador);
            partidaObj.setJugadores(partidaTemp.jugadores);
            console.log(partidaObj);
            setPartida(partidaObj);
            setJugadores(partidaObj.getJugadores());

            /* let partidaTemp = partida;
            partidaTemp.getJugadores().push(data);
            setPartida(partidaTemp);
            setJugadores(partidaTemp.getJugadores());
            setUltimoJugador(data);*/
        });

        usuario.getSocket().on("actualizarTipo", (tipo) => {
            console.log("actualizarTipo");
            usuario.setTipo(tipo);
            setUsuario(usuario);
        });

        usuario.getSocket().on("userLeft", (partida) => {
            console.log("userLeft");
            let partidaTemp = JSON.parse(partida.partida).state;
            let partidaObj = new Partida(partidaTemp.codigo, partidaTemp.modo, partidaTemp.pista, partidaTemp.vueltas, partidaTemp.tiempo, partidaTemp.cantJugadores);
            partidaObj.setCreador(partidaTemp.creador);
            partidaObj.setJugadores(partidaTemp.jugadores);
            console.log(partidaObj);
            setPartida(partidaObj);
            setJugadores(partidaObj.getJugadores());
        });
        
        usuario.getSocket().on("irPartida", (data) => {
            console.log("irPartida");

            console.log("partida");
            
            let partidaTemp = JSON.parse(data.partida).state;
            let partidaObj = new Partida(partidaTemp.codigo, partidaTemp.modo, partidaTemp.pista, partidaTemp.vueltas, partidaTemp.tiempo, partidaTemp.cantJugadores);
            partidaObj.setCreador(partidaTemp.creador);
            partidaObj.setJugadores(partidaTemp.jugadores);
            partidaObj.setTablero(getMatrixTablero());
            console.log(partidaObj.getTablero());
            props.navigation.navigate("Juego", {usuario: usuario, partida: partidaObj});
        });
    }, []);

    const pista = require('../pistas/pista1.csv');
    const getMatrixTablero = () => {
        let matriz=[];
        fetch(pista)
        .then(response => response.text())
        .then(text => {
            let lista = text.split("\r\n");
            lista.pop();
            lista.forEach(fila => {
                let filaMatriz = fila.split(",");
                matriz.push(filaMatriz);
            });
        })
        .catch(error => console.log(error));
        return matriz;
    }



    const getItemsJugadores = () => {
        console.log("getItemsJugadores");
        console.log(jugadores);
        let itemsJugadores = [];
        jugadores.forEach(jugador => {
            itemsJugadores.push(
                <View key={jugador[1]}>
                    <Text>{jugador.toString()}</Text>
                </View>

            );
        });
        return itemsJugadores;
    }

 
    const iniciarPartida = () => {
        usuario.getSocket().emit("cerrarLobby", partida.getCodigo());
        console.log(partida);
        //props.navigation.navigate("Juego", {usuario: usuario, partida: partida});
    }

    return(
        <View>
            <Text>Estoy en lobby</Text>
            <Text>Jugadores</Text>
            {getItemsJugadores()}
            
            <Text>Cantidad de jugadores {jugadores.length}</Text>
            {(usuario.getTipo() == "Creador") ?
                <TouchableOpacity onPress={()=> iniciarPartida()}>
                    <Text>Empezar partida</Text>
                </TouchableOpacity>
                :null
            }

            
        </View>
    );
}

export default Lobby;
/*



    constructor(props) {
        super(props);
        this.state = {
            usuario: props.route.params.usuario,
            partida: props.route.params.partida
        };
    }


    render(){
        let itemsJugadores = [];
        this.state.partida.getJugadores().forEach(jugador => {
            itemsJugadores.push(
                <View key={jugador}>
                    <Text>{jugador}</Text>
                </View>
            );
        });

        return(
            <View>
                <Text>Estoy en lobby</Text>
                <Text>{this.state.partida.toString() }</Text>
                <Text>Jugadores</Text>
                {itemsJugadores}
                <Text>Cantidad de jugadores {this.state.partida.getCantidadJugadores() }</Text>
                
            </View>
        );
    }
}*/