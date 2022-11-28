import React, {useEffect, useState} from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Partida from "../clases/Partida";
//import Tablero from "./Tablero";
//var reader = require('any-text');
import * as stylesTemp from "../css/Juego.css.js";
const styles = stylesTemp.style;

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
    const [forsarRender, setForsarRender] = useState(false);
    const [tablero, setTablero] = useState(null);
    const [sentidoCorrecto, setSentido] = useState(true);
    const [tiempo, setTiempo] = useState(5);
    const [counter, setCounter] = useState(null);

    const Temp = 1000;
    useEffect(() => {
        console.log("useEffectjuego");
        console.log(partida.getEstado());
        
        function handleKeyDown(event) {
            if(event.repeat) return;
            if((event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") && partida.getEstado() === "activa"){
                console.log(usuario.getFicha().vueltasCompletas);
                if(0 >  usuario.getFicha().vueltasCompletas){
                    console.log(event.key);
                    let direcciones = {"ArrowUp":"w", "ArrowDown":"s", "ArrowLeft":"a", "ArrowRight":"d"};
                    usuario.getSocket().emit("mover", {partida: partida.getCodigo(), direccion: direcciones[event.key]});
                }
            }else if (usuario.getTipo()=="Creador" && (event.key === 'u' || event.key === 'U') ){
                console.log('u');
                partida.setEstado("activa");

                usuario.getSocket().emit("iniciarJuego", partida);
            }
        }
        const interval = setInterval(() => {
            console.log("interval");
            setForsarRender(!forsarRender);
            clearInterval(interval);
        },10);
        

        document.addEventListener("keydown", handleKeyDown);

        //render tablero cuando se carga la pagina

        usuario.getSocket().on("iniciarJuego", (data) => {
            partida.setEstado("activa");
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
        });

        usuario.getSocket().on("actualizarJugador", (data) => {
            console.log("actualizarJugador");
            console.log(data);
            let usuarioTemp = usuario;
            usuarioTemp.setFicha(data[3]);
            setUsuario(usuarioTemp);
        });

        usuario.getSocket().on("actualizarSentido", (data) => {
            console.log("sentido");
            console.log(data);
            setSentido(data);
        });



        usuario.getSocket().on("finalizarPartida", (data) => {
            console.log("finalizarPartida");
            console.log(data);
            let nuevaPartida = partidaFromJson(data);
            console.log(nuevaPartida);


            alert("La partida ha finalizado");
            //usuario.getSocket().emit("guardarPartidaRanking",{partida: data, usuario: JSON.stringify(usuario)});
            props.navigation.navigate("Estadisticas", {usuario: usuario, partida: nuevaPartida});
        });




        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            //clearInterval(interval);
        };
    }, []);



    const partidaFromJson = (json) => {
        let partida = new Partida(json.codigo, json.modo, json.pista, json.vueltas, json.tiempo, json.cantJugadores);
        partida.setCreador(json.creador);
        partida.setJugadores(json.jugadores);
        partida.setEstado(json.estado);
        partida.setTablero(json.tablero);
        partida.setMatriz(json.matriz);
        partida.setPosiciones(json.posiciones);
        return partida;
    }
/*
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
    }*/

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
   

    
    function generarTablero(){
        console.log("generarTablero");
        let matriz = partida.getMatriz();
        let tablero = [];
        let i = 0;
        let j = 0;
        matriz.forEach(fila => {
            let filaTablero = [];
            fila.forEach(celda => {
                let colorCelda = "white";
                if(celda[0] === "1"){
                    colorCelda = "green";
                }else if(celda[0] === "2"){
                    colorCelda = "purple";
                }else if(celda[0] === "3"){
                    colorCelda = "blue";
                }else if(celda[0] === "x"){
                    colorCelda = "black";
                }else if(typeof celda === "object"){
                    console.log("es un objeto");
                    console.log(celda);
                    celda = celda[0];
                }
                filaTablero.push(
                    <TouchableOpacity  key={i + "," + j}  style={[styles.celda,{backgroundColor:colorCelda}]} disabled>        
                        {typeof(partida.getTablero()[i][j]) === "object" ?
                            <TouchableOpacity style={[styles.celdaFicha, {backgroundColor:partida.getTablero()[i][j][3].color}]}>
                                <Text>{/*partida.getTablero()[i][j][0]*/}</Text>
                            </TouchableOpacity>
                            :
                            <Text>{/*celda*/}</Text>
                        }      
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
        <View style={styles.container}>
            <Text>{partida.getCodigo()}</Text>
            <View style={styles.rowContainer}>
                <View style={styles.containerJugadores}>
                    <Text style={{fontSize:20, marginVertical:5}} >Jugadores: {partida.getJugadores().length}</Text>
                    <ScrollView style={styles.jugadoresScroll}>
                        {getItemsJugadores()}   
                    </ScrollView>
                </View>
                <View style={styles.containerColores}>
                    <View style={styles.tablero}>
                        {generarTablero()}
                    </View>
                    {!sentidoCorrecto ?
                        <Text style={{color:'white',position: 'absolute'}}>Sentido incorrecto</Text>
                        :null
                    }
                </View>

            </View>
            
        </View>



        
    );


}export default Juego;


