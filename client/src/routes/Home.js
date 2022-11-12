import React,{Component} from "react";
import {Text,View,TouchableOpacity} from "react-native";

import Usuario from "../clases/Usuario";





export default class Home extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            socket: props.route.params.pSocket
        };
        console.log("constructor");
    }
    
    ingresar = () => {
        console.log("estoy en ingresar");
        let usuario = new Usuario(this.state.socket,this.state.nickName);
        this.props.navigation.navigate("PantallaSeleccion",{usuario: usuario});
    }



    render(){
        return(

            <View>
                <Text>Nickname</Text>
                {/* redirige a la página StackScreen */}
                <input 
                    placeholder="Ingrese su nick..." 
                    id="i-nickName"
                    name="i-nickName"
                    onChange={(event) => this.setState({nickName: event.target.value})}
                    value={this.state.nickName}/>
               
               <Text>{this.state.socket.id} </Text>
                <TouchableOpacity 
                    onPress={() => {
                        this.state.nickName !== '' ? 
                            this.ingresar()
                            : 
                            alert("Ingrese un nickName") 
                        }}
                >
                    <Text>Enviar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}