import React, {useEffect, useState} from "react";
import {View, Text, ScrollView,SafeAreaView, TouchableOpacity} from "react-native";
import { style } from "../css/Lobby.css.js";
import * as stylesTemp from "../css/Ranking.css.js";
const styles = stylesTemp.style;




function Ranking(props) {
    const [usuario, setUsuario] = useState(props.route.params.usuario);
    const [ranking, setRanking] = useState(null);
    useEffect(() => {
        console.log("useEffectRanking");
        usuario.getSocket().emit("obtenerRanking");
        usuario.getSocket().on("ranking", (ranking) => {
            console.log("ranking recibido");
            setRanking(ranking);
        });
    }, []);
    


    const getItemsRanking = () => {
        let items = [];
        if(ranking != null){
            let i = 1;
            ranking.forEach((element) => {
                items.push(
                    <View style={styles.itemRanking} key={i}>
                        <Text style={styles.textoRanking}>{element[0]}</Text>
                        <Text style={styles.textoRanking}>{element[1]}</Text>
                        <Text style={styles.textoRanking}>{element[2]}</Text>
                        <Text style={styles.textoRanking}>{element[3]}</Text>
                        <Text style={styles.textoRanking}>{element[4]}</Text>
                    </View>
                );
            });
        }
        return items;
    }

    return (
        <View style={styles.container}>
            <View style={styles.scroll}>
            <View style={[styles.itemRanking]}>
                <Text style={[styles.textoRanking,{fontWeight:'bold'}]}>Ganador</Text>
                <Text style={[styles.textoRanking,{fontWeight:'bold'}]}>Tiempo</Text>
                <Text style={[styles.textoRanking,{fontWeight:'bold'}]}>Pista</Text>
                <Text style={[styles.textoRanking,{fontWeight:'bold'}]}>Vueltas</Text>
                <Text style={[styles.textoRanking,{fontWeight:'bold'}]}>Sala</Text>
            </View>


    
   
                {getItemsRanking()}
            </View>
        
           

        </View>
    );
}

export default Ranking;
