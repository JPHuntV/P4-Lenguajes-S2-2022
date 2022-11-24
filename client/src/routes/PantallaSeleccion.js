import React,{Component} from "react";
import {Text,View,TouchableOpacity} from "react-native";
import { Socket } from "socket.io-client";


export default class PantallaSeleccion extends Component{

    constructor(props){
        super(props);
        this.state = {
            usuario: props.route.params.usuario
        };
    }

    irAPartida = () => {
        console.log("ir a partidas");
        let socket  = this.state.usuario.getSocket();
        socket.emit("obtenerPartidas");
        socket.on("partidas", (partidas) => {
            console.log("partidas recibidas" + partidas.length);
            this.props.navigation.navigate("ListaPartidas",{usuario: this.state.usuario, partidas: partidas});
        });
    }


    
    render(){
        console.log("usuario: " + this.state.usuario);
        return(
            <View>
                <Text>{this.props.route.params.usuario.toString()}</Text>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("CrearPartida",{usuario:this.state.usuario });console.log("si")} }> 
                    <Text>Crear partida</Text>
                </TouchableOpacity>

                <View>

                </View>
                <TouchableOpacity onPress={()=> this.irAPartida()}> 
                    <Text>Unirser a partida</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>console.log("ranking")}> 
                    <Text>Ver ranking </Text>
                </TouchableOpacity>
            </View>
        );
    }
}