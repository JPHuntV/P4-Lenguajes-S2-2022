import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Partida from "../clases/Partida";
//import Tablero from "./Tablero";
//var reader = require('any-text');

function Juego(props){

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
        console.log("me llamaron");
        console.log(matriz);
        return matriz;
    }

    
    const [usuario, setUsuario] = useState(props.route.params.usuario);
    const [partida, setPartida] = useState(props.route.params.partida);
    //const [jugadores, setJugadores] = useState(props.route.params.partida.getJugadores());
    //const [matriz, setMatriz] = useState(getMatrixTablero());
    const [forsarRender, setForsarRender] = useState(false);
    const [tablero, setTablero] = useState(null);

    useEffect(() => {
        console.log("useEffectjuego");
        console.log(partida.getTablero());
        
        function handleKeyDown(event) {
            if (event.key === 'ArrowUp') {
                console.log('up');
                usuario.getSocket().emit("mover", {partida: partida.getCodigo(), direccion: "w"});
            } else if (event.key === 'ArrowDown') {
                console.log('down');
                usuario.getSocket().emit("mover", {partida: partida.getCodigo(), direccion: "s"});
            } else if (event.key === 'ArrowLeft') {
                console.log('left');
                usuario.getSocket().emit("mover", {partida: partida.getCodigo(), direccion: "a"});
            } else if (event.key === 'ArrowRight') {
                console.log('right');
                usuario.getSocket().emit("mover", {partida: partida.getCodigo(), direccion: "d"});
            } else if (usuario.getTipo()=="Creador" && (event.key === 'u' || event.key === 'U') ){
                console.log('u');
                //console.log(matriz);
                //setTablero(generarTablero());
                //partida.setTablero(getMatrixTablero());
                usuario.getSocket().emit("iniciarJuego", partida);
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        //render tablero cuando se carga la pagina

        usuario.getSocket().on("iniciarJuego", (data) => {
            console.log("iniciarJuego");
            setTablero(generarTablero());
        });

        usuario.getSocket().on("ubicarJugador", (data) => {
            console.log("ubicarJugador");
            console.log(data);
            let usuarioTemp = usuario;
            usuarioTemp.setPosicion(data);
            setUsuario(usuarioTemp);

        });
        
        usuario.getSocket().on("actualizarPartida", (data) => {
            console.log("actualizarPartida");
            console.log(data);
            let nuevaPartida = partidaFromJson(data);
            console.log(nuevaPartida);
            setPartida(nuevaPartida);
            //setJugadores(partida.getJugadores());
            //setMatriz(nuevaPartida.getTablero());
            //setTablero(generarTablero());
        });

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
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

    const getItemsJugadores = () => {
        console.log("getItemsJugadores");
        //console.log(jugadores);
        let jugadores = partida.getJugadores();
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

    
   

    
    function generarTablero(){
        console.log("generarTablero");
        let matriz = partida.getTablero();
        console.log(matriz);
        let tablero = [];
        let i = 0;
        let j = 0;
        matriz.forEach(fila => {
            let filaTablero = [];
            fila.forEach(celda => {
                console.log(celda);
                //definir estilo de celda
                let colorCelda = "white";
                if(celda === "1"){
                    colorCelda = "green";
                }else if(celda === "2"){
                    colorCelda = "purple";
                }else if(celda === "3"){
                    colorCelda = "blue";
                }else if(celda === "x"){
                    colorCelda = "black";
                }else if(typeof celda === "object"){
                    console.log("es un objeto");
                    console.log(celda);
                    celda = celda[0];
                }
                filaTablero.push(
                    <TouchableOpacity  key={i + "," + j}  style={[styles.celda,{backgroundColor:colorCelda}]}>
                        <Text>{celda}</Text>
                    </TouchableOpacity>
                );
                j++;
            });
            console.log("salgo del for");
            tablero.push(
                <View key={i} style={styles.fila}>
                    {filaTablero}
                </View>
            );
            i++;
            j = 0;
        });
        return tablero;
    }


    

    return(
        <View>
            <Text>Estoy en iniciarPartida</Text>
            <Text>Jugadores</Text>
            {getItemsJugadores()}
            <Text>Cantidad de jugadores {partida.getJugadores().length}</Text>
            {(usuario.getTipo() == "Creador") ?
                <TouchableOpacity >
                    <Text>Esperando admin</Text>
                </TouchableOpacity>
                :null
            }
            <View style={styles.tablero}>
                {partida.getTablero().length > 0 ? generarTablero() : console.log("matriz vacia")}
                
            </View>
            <Text>Tablero</Text>


        </View>
    );


}export default Juego;



const styles = StyleSheet.create({
    fila: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    celda: {
        borderWidth: 1,
        borderColor: "black",
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        
    },
    tablero: {
        borderWidth: 1,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    celdaPared: {
        borderWidth: 1,
        borderColor: "black",
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
    },
    //ficha circular
    celdaFicha: {
        borderWidth: 1,
        borderColor: "black",
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "yellow",
        borderRadius: 50,
    },



 

});
