import React, {Component, useEffect, useState} from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Partida from "../clases/Partida";
function Lobby(props) {

    const [usuario, setUsuario] = useState(props.route.params.usuario);
    const [partida, setPartida] = useState(props.route.params.partida);
    //const [jugadores, setJugadores] = useState(props.route.params.partida.getJugadores());
    const [ultimoJugador, setUltimoJugador] = useState(null);
    const temporizadorLobby = 100000;
    useEffect(() => {
        console.log("useEffect");
        usuario.getSocket().on("userJoined", (partidaTemp) => {
            console.log("userJoin");
         
            let partidaObj = new Partida(partidaTemp.codigo, partidaTemp.modo, partidaTemp.pista, partidaTemp.vueltas, partidaTemp.tiempo, partidaTemp.cantJugadores);
            partidaObj.setCreador(partidaTemp.creador);
            partidaObj.setJugadores(partidaTemp.jugadores);
            console.log(partidaObj);
            setPartida(partidaObj);

            /* let partidaTemp = partida;
            partidaTemp.getJugadores().push(data);
            setPartida(partidaTemp);
            setJugadores(partidaTemp.getJugadores());
            setUltimoJugador(data);*/
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
        console.log(partida.getJugadores());
        let itemsJugadores = [];
        partida.getJugadores().forEach(jugador => {
            itemsJugadores.push(
                <View key={jugador[1]} style={styles.tarjetaJugador}>
                    <Text>{"nombre: " + jugador[0] + "  socket: " + jugador[1] + "  color: " + jugador[3].color  }</Text>
                    <TouchableOpacity disabled style={{backgroundColor: jugador[3].color, width: 20, height: 20, borderRadius: 50}}></TouchableOpacity>
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
                "#f0b57b", "#03e5ce", "#4c70da", "#6171b7", "#006666", "#800000", "#8a2be2"];
       let itemsColores = [];
        colores.forEach(color => {
            itemsColores.push(
                //disable si el color ya fue elegido
                

                <TouchableOpacity key={color} style={[styles.colorCard,{backgroundColor:color}]} onPress={() => cambiarColor(color)} disabled={colorElegido(color)}></TouchableOpacity>
            );
        });
        return itemsColores;
    }

    const colorElegido = (color) => {
        let elegido = false;
        partida.getJugadores().forEach(jugador => {
            if(jugador[3].color == color){
                elegido = true;
            }
        });
        return elegido;
    }


    return(
        <View>
            <Text>Estoy en lobby</Text>
            <Text>Jugadores</Text>
            {getItemsJugadores()}
            
            <Text>Cantidad de jugadores {partida.getJugadores().length}</Text>
            {(usuario.getTipo() == "Creador") ?
                <TouchableOpacity onPress={()=> iniciarPartida()}>
                    <Text>Empezar partida</Text>
                </TouchableOpacity>
                :null
            }

            <View style={styles.selectorColores}>
                {/*seleccionar color*/}
                {getSelectorColores()}    
            </View>

            
        </View>
    );
}

export default Lobby;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorCard: {
        width: 50,
        height: 70,
        borderRadius: 15,
        margin: 10,
    },
    tarjetaJugador: {
        backgroundColor: "white",
        alignContent: "center",
        flexDirection: "row",

        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    selectorColores: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    }
});