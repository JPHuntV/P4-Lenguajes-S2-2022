import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Partida from "../clases/Partida";

function Juego(props){

    const [usuario, setUsuario] = useState(props.route.params.usuario);
    const [partida, setPartida] = useState(props.route.params.partida);
    const [jugadores, setJugadores] = useState(props.route.params.partida.getJugadores());





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
            <Text>Estoy en iniciarPartida</Text>
            <Text>Jugadores</Text>
            {getItemsJugadores()}
            
            <Text>Cantidad de jugadores {jugadores.length}</Text>
            {(usuario.getTipo() == "Creador") ?
                <TouchableOpacity >
                    <Text>Esperando admin</Text>
                </TouchableOpacity>
                :null
            }

            
        </View>
    );


}export default Juego;
