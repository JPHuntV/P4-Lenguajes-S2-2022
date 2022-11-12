import React,{Component} from "react";
import {Text,View,TouchableOpacity} from "react-native";


export default class PantallaSeleccion extends Component{
    render(){
        return(
            <View>
                <Text>{this.props.route.params.usuario.toString()}</Text>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("CrearPartida",{usuario:this.props.route.params.usuario });console.log("si")} }> 
                    <Text>Crear partida</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> console.log("unirse")}> 
                    <Text>Unirser a partida</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>console.log("ranking")}> 
                    <Text>Ver ranking </Text>
                </TouchableOpacity>
            </View>
        );
    }
}