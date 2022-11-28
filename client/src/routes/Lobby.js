import React, {Component, useEffect, useState} from "react";

import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Partida from "../clases/Partida";
import * as stylesTemp from "../css/Lobby.css.js";
const styles = stylesTemp.style;

function Lobby(props) {

    const [usuario, setUsuario] = useState(props.route.params.usuario);
    const [partida, setPartida] = useState(props.route.params.partida);
    //const [jugadores, setJugadores] = useState(props.route.params.partida.getJugadores());
    //const [ultimoJugador, setUltimoJugador] = useState(null);
    const temporizadorLobby = 30000000;//quitar 2 ceros
    useEffect(() => {
        console.log("useEffect");
        usuario.getSocket().on("userJoined", (partidaTemp) => {
            console.log("userJoin");
         
            let partidaObj = new Partida(partidaTemp.codigo, partidaTemp.modo, partidaTemp.pista, partidaTemp.vueltas, partidaTemp.tiempo, partidaTemp.cantJugadores);
            partidaObj.setCreador(partidaTemp.creador);
            partidaObj.setJugadores(partidaTemp.jugadores);
            console.log(partidaObj);
            setPartida(partidaObj);

        });

        const interval = setInterval(() => {
            console.log("intervalss");
            clearInterval(interval);
            usuario.getSocket().emit("eliminarPartida", partida.getCodigo());
        },temporizadorLobby);

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
        });
        
        usuario.getSocket().on("irPartida", (data) => {
            console.log("irPartida");

            console.log("partida");
            
            let partidaTemp = JSON.parse(data.partida).state;
            let partidaObj = new Partida(partidaTemp.codigo, partidaTemp.modo, partidaTemp.pista, partidaTemp.vueltas, partidaTemp.tiempo, partidaTemp.cantJugadores);
            partidaObj.setCreador(partidaTemp.creador);
            partidaObj.setJugadores(partidaTemp.jugadores);
            partidaObj.setTablero(getMatrixTablero());
            partidaObj.setMatriz(partidaObj.getTablero());
            console.log(partidaObj.getTablero());
            clearInterval(interval);
            props.navigation.navigate("Juego", {usuario: usuario, partida: partidaObj});
        });



        usuario.getSocket().on("actualizarPartida", (data) => {
            console.log("actualizarPartida");
            console.log(data);
            let nuevaPartida = partidaFromJson(data);
            console.log(nuevaPartida);
            setPartida(nuevaPartida);
        });


        usuario.getSocket().on("partidaEliminada", (data) => {
            console.log("partidaEliminada");
            let usuarioTemp = usuario;
            usuarioTemp.resetUsuario();
            props.navigation.navigate("PantallaSeleccion", {usuario: usuarioTemp});
        });

        return () => {
            clearInterval(interval);
        }
    }, []);


    const partidaFromJson = (json) => {
        let partida = new Partida(json.codigo, json.modo, json.pista, json.vueltas, json.tiempo, json.cantJugadores);
        partida.setCreador(json.creador);
        partida.setJugadores(json.jugadores);
        partida.setEstado(json.estado);
        partida.setTablero(json.tablero);
        partida.setMatriz(json.matriz);
        return partida;
    }


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
        let itemsJugadores = [];
        partida.getJugadores().forEach(jugador => {
            itemsJugadores.push(
                <View key={jugador[1]} style={styles.tarjetaJugador} >
                    <TouchableOpacity disabled style={{backgroundColor: jugador[3].color, width: 35, height: 35, borderRadius: 50, margin:5}}></TouchableOpacity>
                    <Text style={{fontSize:20, marginLeft:10}} >{jugador[0]}</Text>
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

    const cambiarColor = (color) => {
        usuario.getSocket().emit("cambiarColor", {codigo: partida.getCodigo(), color: color});
    }


    const getSelectorColores = () => {
        const colores = ["#9a1b5b", "#3e1379", "#0a5f42", "#511111", "#115151", 
                "#96e637", "#9a0000", "#a3b899", "#65cca9", "#ff461f", "#a25670", 
                "#f0b57b", "#03e5ce", "#4c70da", "#800000", "#8a2be2"];
       let itemsColores = [];
        colores.forEach(color => {
            let elegido = colorElegido(color);
            itemsColores.push(
                //disable si el color ya fue elegido

                <TouchableOpacity key={color} style={[styles.colorCard,{backgroundColor:color}]} onPress={() => cambiarColor(color)} disabled={elegido}>
                    {elegido && <Text style={{color: "white", fontSize:20, fontWeight:'bold'}}>{elegido}</Text>}
                </TouchableOpacity>
            );
        });
        return itemsColores;
    }

    const colorElegido = (color) => {
        let elegido = false;
        partida.getJugadores().forEach(jugador => {
            if(jugador[3].color == color){
                elegido = jugador[0];
            }
        });
        return elegido;
    }


    return(
        <View style={styles.container}>
            <Text style={{fontSize:25,  fontWeight:'bold', color:'white'}}>Sala: {partida.getCodigo()}</Text>
            <View style={styles.rowContainer}>
                <View style={styles.containerJugadores}>
                    <Text style={{fontSize:20, marginVertical:5, fontWeight:'bold', color:'white'}} >Jugadores: {partida.getJugadores().length}</Text>
                    <ScrollView style={styles.jugadoresScroll}>
                        {getItemsJugadores()}   
                    </ScrollView>
                </View>
                <View style={styles.containerColores}>
                    <Text style={{fontSize:20, marginVertical:5, fontWeight:'bold', color:'white'}} >Seleccione su vehículo</Text>
                    <View style={styles.listaColores}>
                        {getSelectorColores()}  
                    </View>
                </View>
            </View>
                {(usuario.getTipo() == "Creador") ?
                    <TouchableOpacity onPress={()=> iniciarPartida()} style={styles.botonInicio} >
                        <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}  >Empezar partida</Text>
                    </TouchableOpacity>
                    :
                    <Text style={styles.botonInicio}>Esperando al creador</Text>
                }
        </View>
    );
}

export default Lobby;


