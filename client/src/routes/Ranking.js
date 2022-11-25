import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";




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
                        <Text style={styles.texto}>{element[0]}</Text>
                        <Text style={styles.texto}>{element[1]}</Text>
                        <Text style={styles.texto}>{element[2]}</Text>
                        <Text style={styles.texto}>{element[3]}</Text>
                        <Text style={styles.texto}>{element[4]}</Text>
                    </View>
                );
            });
        }
        return items;
    }

    return (
        <View style={styles.container}>
    
   
                {getItemsRanking()}

        </View>
    );
}

export default Ranking;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        flex: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textoHeader: {
        color: "#ffffff",
        fontSize: 30,
    },
    textoRanking: {
        fontSize: 20,
    },
    itemRanking: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    boton: {
        backgroundColor: "#ffffff",
        width: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    textoBoton: {
        color: "#000000",
        fontSize: 20,
    },
});



