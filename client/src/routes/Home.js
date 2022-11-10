import React,{Component} from "react";
import {Text,View,TouchableOpacity} from "react-native";



export default class Home extends Component{
    render(){
        return(
            <View>
                <Text>Home</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("StackScreen") }> {/* redirige a la página StackScreen */}
                    <Text>Ir a otra pagina</Text>
                </TouchableOpacity>
            </View>
        );
    }
}