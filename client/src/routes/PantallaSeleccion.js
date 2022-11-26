import React,{useEffect, useState} from "react";
import {Text,View,TouchableOpacity, StyleSheet, Image} from "react-native";
import { Socket } from "socket.io-client";
import * as stylesTemp from "../css/PantallaSeleccion.css.js";
const styles = stylesTemp.style;
function PantallaSeleccion(props){
    const [usuario, setUsuario] = useState(props.route.params.usuario);

    const irAPartida = () => {
        console.log("ir a partidas");
        let socket  = usuario.getSocket();
        socket.emit("obtenerPartidas");
        socket.on("partidas", (partidas) => {
            console.log("partidas recibidas" + partidas.length);
            props.navigation.navigate("ListaPartidas",{usuario: usuario, partidas: partidas});
        });
    }

    return(
        <View style={styles.container}>
            <View style={styles.head}>
                <Image style={styles.imagenUsuario} source={require("../assets/images/usuario.png")}/>
                <Text style={{fontSize:30}}>{usuario.getNickName()}</Text>
            </View>
            <View style={styles.rowContainer}>
                <TouchableOpacity 
                    style={styles.gameModeCard}
                    onPress={()=>props.navigation.navigate("CrearPartida",{usuario:usuario }) }> 
                    <Image style={styles.gameModeImage} source={require("../assets/images/crearPartida.png")}/>
                    <Text>Crear partida</Text>
                    <Text>Crea una sala e invita a tus amigos para que compitan contra ti</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.gameModeCard}
                    onPress={()=> irAPartida()}> 
                    <Image style={styles.gameModeImage} source={require("../assets/images/unirsePartida.png")}/>
                    <Text>Unirser a partida</Text>
                    <Text>Unete a una partida ya existente y compite contra hasta 11 jugadores</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.gameModeCard}
                    onPress={()=> props.navigation.navigate("Ranking",{usuario:usuario})}> 
                    <Image style={styles.gameModeImage} source={require("../assets/images/ranking.png")}/>
                    <Text>Ver ranking </Text>
                    <Text>Ver el ranking de los mejores jugadores</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}export default PantallaSeleccion;

