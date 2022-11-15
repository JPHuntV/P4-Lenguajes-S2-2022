import React, {Component} from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class Lobby extends Component{

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
                {itemsJugadores}
                <Text>Cantidad de jugadores {this.state.partida.getCantidadJugadores() }</Text>
                
            </View>
        );
    }
}