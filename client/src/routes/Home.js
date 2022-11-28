import React,{useEffect, useState} from "react";
import {Text,View,Image,TouchableOpacity} from "react-native";

import Usuario from "../clases/Usuario";
import * as stylesTemp from "../css/Home.css.js";
const styles = stylesTemp.style;



function Home(props) {
    
    const [nickName, setNickName] = useState("");
    const [socket, setSocket] = useState(props.route.params.pSocket);

    /*constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            socket: props.route.params.pSocket
        };
        console.log("constructor");
    }*/
    
    const ingresar = () => {
        console.log("estoy en ingresar");
        let usuario = new Usuario(socket,nickName);
        props.navigation.navigate("PantallaSeleccion",{usuario: usuario});
    }

    return(

        <View style={styles.container}>
            <Text></Text>
            <View style={styles.container2} >
                    <Image style={styles.logo} source={require("../assets/images/logo.png")}></Image>
              
                <View style={styles.container3}>
                    <Text 
                        style={[{
                            fontSize: 20,
                            color: "#ffffff",
                            height: '5vh',
                            width: '30vw',
                        }]}
                    >Ingrese su nickname</Text>
                    {/* redirige a la página StackScreen */}
                    
                    <input 
                        placeholder="Ingrese su nick..." 
                        id="i-nickName"
                        name="i-nickName"
                        onChange={(e) => setNickName(e.target.value)}
                        //onChange={(event) => this.setState({nickName: event.target.value})}
                        value={nickName}
                        style={styles.inputNickName}
                        />
                    <TouchableOpacity 
                        style={styles.botonIngresar}
                        onPress={() => {
                            nickName !== '' ? 
                                ingresar()
                                : 
                                alert("Ingrese un nickName") 
                            }}
                    >
                        <Text style={{color:'white', fontSize:20}} >Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
    
}export default Home;