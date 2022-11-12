import React, {Component} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { io, Socket } from "socket.io-client";
import Partida from "../clases/Partida";

export default class CrearPartida extends Component{

    constructor(props) {
        super(props);
        this.state = {
            usuario: props.route.params.usuario,
            sala: "",
            modo:"Vs",
            pista:"Pista 1",
            vueltas: 3,
            tiempo: 30,
            jugadores: 2

        };
    }

    componentDidMount(){
        this.setState({sala:this.makeid(5)});
    }   

    makeid = (length) =>{
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        if(this.salaExiste(result)){
            console.log("id repetido");
            return this.makeid(length);
        }else{
            console.log("id no repetido");
            this.setState({sala: result});
            return result;
        }
    }

    salaExiste = (id) => {
        let socket = this.state.usuario.getSocket();
        socket.emit("verificarSala",id);
        socket.on("salaExiste",(existe)=>{
            console.log(existe);
            return existe;
        });
    }

    CrearPartida = () => {
        console.log("estoy en CrearPartida");
        this.state.usuario.setTipo("Creador");
        let partida = new Partida(this.state.sala,this.state.modo,this.state.pista,this.state.vueltas,this.state.tiempo,this.state.jugadores);
        this.props.navigation.navigate("Lobby",{usuario: this.state.usuario, partida: partida});
    }

    render(){
        return(
            <View>
                <Text>Crear partida</Text>
                <Text>Sala: {this.state.sala}</Text>
                <Text>Seleccionar modo de juego: {this.state.modo}</Text>
                <TouchableOpacity 
                    style={this.state.modo === "Vs" ? styles.modoSeleccionado : styles.modoNoSeleccionado}
                    onPress={()=>{console.log("Vs"); this.setState({modo:"Vs"}) }}>
                    <Text style={this.state.modo ==="Vs" ? {color:"white"}:{color:"black"} }>Vs</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={this.state.modo === "Contrareloj" ? styles.modoSeleccionado : styles.modoNoSeleccionado}
                    onPress={()=>{console.log("Contrareloj"); this.setState({modo:"Contrareloj"}) }}>
                    <Text style={this.state.modo ==="Contrareloj" ? {color:"white"}:{color:"black"} }>Contrareloj</Text>
                </TouchableOpacity>
                <Text>Seleccionar pista</Text>
                <TouchableOpacity
                    style={this.state.pista === "Pista 1" ? styles.pistaSeleccionada : styles.pistaNoSeleccionada}
                    onPress={()=>{console.log("Pista 1"); this.setState({pista:"Pista 1"}) }}>
                    <Text style={this.state.pista ==="Pista 1" ? {color:"white"}:{color:"black"} }>Pista 1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={this.state.pista === "Pista 2" ? styles.pistaSeleccionada : styles.pistaNoSeleccionada}
                    onPress={()=>{console.log("Pista 2"); this.setState({pista:"Pista 2"}) }}>
                    <Text style={this.state.pista ==="Pista 2" ? {color:"white"}:{color:"black"} }>Pista 2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={this.state.pista === "Pista 3" ? styles.pistaSeleccionada : styles.pistaNoSeleccionada}
                    onPress={()=>{console.log("Pista 3"); this.setState({pista:"Pista 3"}) }}>
                    <Text style={this.state.pista ==="Pista 3" ? {color:"white"}:{color:"black"} }>Pista 3</Text>
                </TouchableOpacity>
                <Text>Numero de vueltas</Text>
                <input 
                    type="number" 
                    min="3"
                    value={this.state.vueltas} onChange={(e)=>{this.setState({vueltas:e.target.value})}}
                ></input>
                <Text>Numero de jugadores</Text>
                <input
                    type="number"
                    min="2"
                    value={this.state.jugadores} onChange={(e)=>{this.setState({jugadores:e.target.value})}}
                ></input>
                {this.state.modo === "Contrareloj" ?
                    <view>

                    <text>Tiempo</text>
                    <input
                        type="number"
                        min="30"
                        value={this.state.tiempo} onChange={(e)=>{this.setState({tiempo:e.target.value})}}
                        ></input>
                    </view>
                :null}
                <button onClick={() => this.CrearPartida()}>Crear partida</button>
            </View>
        );
    }
}


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
});