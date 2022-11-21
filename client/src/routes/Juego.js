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
    const [jugadores, setJugadores] = useState(props.route.params.partida.getJugadores());
    const [matriz, setMatriz] = useState(getMatrixTablero());
    const [forsarRender, setForsarRender] = useState(false);
    const [tablero, setTablero] = useState(null);

    useEffect(() => {
        console.log("useEffectjuego");
        console.log(matriz);
        
        function handleKeyDown(event) {
            if (event.key === 'ArrowUp') {
                console.log('up');
            } else if (event.key === 'ArrowDown') {
                console.log('down');
            } else if (event.key === 'ArrowLeft') {
                console.log('left');
            } else if (event.key === 'ArrowRight') {
                console.log('right');
            } else if (event.key === 'u' || event.key === 'U') {
                console.log('u');
                console.log(matriz);
                setTablero(generarTablero());
                partida.setTablero(matriz);
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
            usuario.setPosicion(data);

        });
        
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
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

    
   

    
    function generarTablero(){
        console.log("generarTablero");
        console.log(matriz);
        let tablero = [];
        let i = 0;
        let j = 0;
        matriz.forEach(fila => {
            let filaTablero = [];
            fila.forEach(celda => {
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
                }
                filaTablero.push(
                    <TouchableOpacity  key={i + "," + j}  style={[styles.celda,{backgroundColor:colorCelda}]}>
                        <Text>{celda}</Text>
                    </TouchableOpacity>
                );
                j++;
            });
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
            <Text>Cantidad de jugadores {jugadores.length}</Text>
            {(usuario.getTipo() == "Creador") ?
                <TouchableOpacity >
                    <Text>Esperando admin</Text>
                </TouchableOpacity>
                :null
            }
            <View style={styles.tablero}>
                {matriz.length > 0 ? tablero : console.log("matriz vacia")}
                
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
