import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { io, Socket } from "socket.io-client";
import Partida from "../clases/Partida";
import * as stylesTemp from "../css/CrearPartida.css.js";
const styles = stylesTemp.style;

function CrearPartida(props) {


    const makeid = (length) =>{
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        if(salaExiste(result)){
            console.log("id repetido");
            return makeid(length);
        }else{
            console.log("id no repetido");
            setSala(result);
            return result;
        }
    }

    const salaExiste = (id) => {
        let socket = usuario.getSocket();
        socket.emit("verificarSala",id);
        socket.on("salaExiste",(existe)=>{
            console.log(existe);
            return existe;
        });
    }

    const [usuario, setUsuario] = useState(props.route.params.usuario);
    const [sala, setSala] = useState("");
    const [modo, setModo] = useState("Vs");
    const [pista, setPista] = useState("Pista 1");
    const [vueltas, setVueltas] = useState(3);
    const [tiempo, setTiempo] = useState(0);
    const [jugadores, setJugadores] = useState(2);
    const [partida, setPartida] = useState(null);

    useEffect(() => {
        console.log("useEffect");
        
        if(sala == ""){
            setSala(makeid(5));
        }

        usuario.getSocket().on("partidaCreadaC",(partidaC)=>{
            console.log("partida creada");
            console.log(partida);
            let partidaTemp = partidaFromJson(partidaC);
            props.navigation.navigate("Lobby",{usuario: usuario, partida: partida});
        });
    }, []);

    /*constructor(props) {
        super(props);
        this.state = {
            usuario: props.route.params.usuario,
            sala: "",
            modo:"Vs",
            pista:"Pista 1",
            vueltas: 3,
            tiempo: 0,
            jugadores: 2

        };
    }

    componentDidMount(){
        this.setState({sala:this.makeid(5)});
    }   */

    

    
    const partidaFromJson = (json) => {
        let partida = new Partida(json.codigo, json.modo, json.pista, json.vueltas, json.tiempo, json.cantJugadores);
        partida.setCreador(json.creador);
        partida.setJugadores(json.jugadores);
        partida.setEstado(json.estado);
        partida.setTablero(json.tablero);
        partida.setMatriz(json.matriz);
        return partida;
    }
    const CrearPartida = () => {
        console.log("estoy en CrearPartida");
        usuario.setTipo("Creador");
        let partida;
        partida = new Partida(sala,modo,pista,vueltas,tiempo,jugadores);
        partida.setCreador(usuario.toJson());
        partida.agregarJugador(usuario.toJson());
        let matriz = getMatrixTablero();
        partida.setTablero(matriz);
        partida.setMatriz(matriz);
        
        let socket = usuario.getSocket();
        console.log("voy a emitir crearPartida");
        let nuevaPartida = JSON.stringify(partida);

        console.log(partida);
        socket.emit("crearPartida",{partida:nuevaPartida});
        socket.on("partidaCreadaC",(partidaC)=>{
            console.log("partida creada");

            props.navigation.navigate("Lobby",{usuario: usuario, partida: partida});
        });
        

    }
    
    const getMatrixTablero = () => {
        let pista = require('../pistas/pista1.csv');
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

   
        return(
            <View style={styles.container}>
                <Text>Sala: {sala}</Text>
                <View style={styles.container2}>
                <Text>Modo de juego</Text>
                <View style={[styles.rowContainer,{gap:'1%'}]}>
                    <TouchableOpacity 
                        style={modo === "Vs" ? [styles.seleccionado, styles.botonModo] : [styles.noSeleccionado, styles.botonModo]}
                        onPress={()=>setModo("Vs")}>
                        <Text style={modo ==="Vs" ? {color:"white"}:{color:"black"} }>Vs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={modo === "Contrareloj" ? [styles.seleccionado, styles.botonModo] : [styles.noSeleccionado, styles.botonModo]}
                        onPress={()=>{console.log("Contrareloj"); setModo("Contrareloj") }}>
                        <Text style={modo ==="Contrareloj" ? {color:"white"}:{color:"black"} }>Contrareloj</Text>
                    </TouchableOpacity>
                </View>
                <Text>Seleccionar pista</Text>
                <View style={[styles.rowContainer,{gap:'1%'}]}>
                    <TouchableOpacity
                        style={pista === "Pista 1" ? [styles.seleccionado, styles.botonPista] : [styles.noSeleccionado, styles.botonPista]}
                        onPress={()=>{console.log("Pista 1"); setPista("Pista 1") }}>
                        <Text style={pista ==="Pista 1" ? {color:"white"}:{color:"black"} }>Pista 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={pista === "Pista 2" ? [styles.seleccionado, styles.botonPista] : [styles.noSeleccionado, styles.botonPista]}
                        onPress={()=>{console.log("Pista 2"); setPista("Pista 2") }}>
                        <Text style={pista ==="Pista 2" ? {color:"white"}:{color:"black"} }>Pista 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={pista === "Pista 3" ? [styles.seleccionado, styles.botonPista] : [styles.noSeleccionado, styles.botonPista]}
                        onPress={()=>{console.log("Pista 3"); setPista("Pista 3") }}>
                        <Text style={pista ==="Pista 3" ? {color:"white"}:{color:"black"} }>Pista 3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <View style={styles.containerVariantes} >
                        <Text>Vueltas</Text>
                        <input 
                            type="number" 
                            min="3"
                            value={vueltas} onChange={(e)=>{setVueltas(e.target.value)}}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.containerVariantes} >
                        <Text style={{marginHorizontal:'2%'}} >Jugadores</Text>
                        <input
                            type="number"
                            min="2"
                            value={jugadores} onChange={(e)=>{setJugadores(e.target.value)}}
                            style={styles.input}
                        />
                    </View>
                    {modo === "Contrareloj" ?
                    <View style={styles.containerVariantes} >
                        <Text style={{marginLeft:'2%'}}>Tiempo</Text>
                        <input
                            type="number"
                            min="30"
                            value={tiempo} onChange={(e)=>{setTiempo(e.target.value)}}
                            style={styles.input}
                        />
                    </View>
                    :null}
                </View>

                    <button onClick={() => CrearPartida()}>Crear partida</button>
                </View>
            </View>
        );
    
} export default CrearPartida;

/*
const styles = StyleSheet.create({
    modoSeleccionado:{
        backgroundColor: "blue",
        color: "white"
    },
    modoNoSeleccionado:{
        backgroundColor: "white",
    },
    pistaSeleccionada:{
        backgroundColor: "blue",
        color: "white"
    },
    pistaNoSeleccionada:{
        backgroundColor: "white",
    }
});*/