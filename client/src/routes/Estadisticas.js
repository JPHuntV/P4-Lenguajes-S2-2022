import React, { useEffect, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Partida from "../clases/Partida";


function Estadisticas(props) {
    const [usuario, setUsuario] = useState(props.route.params.usuario);
    const [partida, setPartida] = useState(props.route.params.partida);

    useEffect(() => {
    }, []);

    const getItemsPosiciones = () => {
        let items = [];
        let posiciones = partida.getPosiciones();
        for (let i = 0; i < posiciones.length; i++) {
            items.push(
                <View style={styles.itemPosiciones} key={posiciones[i][1]}>
                    <Text style={styles.textoPosiciones}>{posiciones[i][0]}</Text>
                    <Text style={styles.textoPosiciones}>{i+1}</Text>
                    <TouchableOpacity disabled style={{backgroundColor: posiciones[i][3].color, width: 20, height: 20, borderRadius: 50}}></TouchableOpacity>

                </View>
            );
        }
        return items;
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


    const volverInicio = () => {
        let usuarioTemp = usuario;
        usuarioTemp.resetUsuario();
        props.navigation.navigate("PantallaSeleccion", {usuario: usuarioTemp});
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Estadisticas</Text>
            <Text style={styles.text}>Codigo: {partida.getCodigo()}</Text>
            <Text style={styles.text}>Modo: {partida.getModo()}</Text>
            <Text style={styles.text}>Pista: {partida.getPista()}</Text>
            {getItemsPosiciones()}
            <View style={styles.tablero}>
                {generarTablero()}
            </View>
            <TouchableOpacity style={styles.boton} onPress={() => volverInicio()}>
                <Text style={styles.textoBoton}>Volver</Text>
            </TouchableOpacity>
        </View>
    );

}
export default Estadisticas;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        color: "black",
    },
    tarjetaJugador: {
        backgroundColor: "white",
        alignContent: "center",
        flexDirection: "row",
    },
    itemPosiciones: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 200,
        margin: 10,
    },
    textoPosiciones: {
        fontSize: 20,
        color: "black",
    },
    tablero: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    fila: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    celda: {
        width: 30,
        height: 30,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },


});