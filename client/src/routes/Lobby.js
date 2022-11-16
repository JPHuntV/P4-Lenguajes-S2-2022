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
        usuario.getSocket().on("userJoined", (data) => {
            console.log("userJoin");
            let jugadoresTemp = jugadores;
            jugadoresTemp.push(data);
            setJugadores(jugadoresTemp);
            setUltimoJugador(data);
            console.log(jugadores);
        });
    }, []);




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

 
    return(
        <View>
            <Text>Estoy en lobby</Text>
            <Text>Jugadores</Text>
            {getItemsJugadores()}
            
            <Text>Cantidad de jugadores {jugadores.length}</Text>
            
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