import React,{useEffect, useState} from "react";
import {Text,View,TouchableOpacity, StyleSheet} from "react-native";
import { Socket } from "socket.io-client";
import * as stylesTemp from "../css/PantallaSeleccion.css.js";
const styles = stylesTemp.style;
function PantallaSeleccion(props){
    const [usuario, setUsuario] = useState(props.route.params.usuario);

    const irAPartida = () => {
        console.log("ir a partidas");
        let socket  = this.state.usuario.getSocket();
        socket.emit("obtenerPartidas");
        socket.on("partidas", (partidas) => {
            console.log("partidas recibidas" + partidas.length);
            this.props.navigation.navigate("ListaPartidas",{usuario: this.state.usuario, partidas: partidas});
        });
    }

    return(
        <View style={styles.container}>
                <Text>{usuario.toString()}</Text>
            <View style={styles.rowContainer}>
                <TouchableOpacity 
                    style={styles.gameModeCard}
                    onPress={()=>props.navigation.navigate("CrearPartida",{usuario:this.state.usuario }) }> 
                    
                    <Text>Crear partida</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.gameModeCard}
                    onPress={()=> this.irAPartida()}> 
                    <Text>Unirser a partida</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.gameModeCard}
                    onPress={()=> props.navigation.navigate("Ranking",{usuario:usuario})}> 
                    <Text>Ver ranking </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}export default PantallaSeleccion;

