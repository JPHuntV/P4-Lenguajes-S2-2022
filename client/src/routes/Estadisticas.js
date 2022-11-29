import React, { useEffect, useState} from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Partida from "../clases/Partida";
import * as stylesTemp from "../css/Estadisticas.css.js";
const styles = stylesTemp.style;


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
                    <Text style={styles.textPosiciones}>{i+1}</Text>
                    <Text style={styles.textPosiciones}>{posiciones[i][0]}</Text>
                    <TouchableOpacity disabled style={{backgroundColor: posiciones[i][3].color, width: 20, height: 20, borderRadius: 50, margin:'auto'}}></TouchableOpacity>

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
                }
                filaTablero.push(
                    <TouchableOpacity  key={i + "," + j}  style={[styles.celda,{backgroundColor:colorCelda}]} disabled>        
                        <Image source={require('../assets/images/'+partida.getPista()+'/'+celda[0]+'.png')} style={styles.imagenCelda} />

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
            <Text style={{fontSize:25,  fontWeight:'bold', color:'white'}}>Partida finalizada</Text>
            <View style={styles.rowContainer}>
                <View style={styles.containerJugadores}>
                    <Text style={styles.text} >Posiciones</Text>
                    <ScrollView style={styles.jugadoresScroll}>
                    {getItemsPosiciones()}  
                    </ScrollView>
                </View>
                <View style={styles.containerColores}>
                    <View style= {styles.containerInfo}>
                        <Text style={styles.text}>Sala: {partida.getCodigo()}</Text>
                        <Text style={styles.text}>Modo: {partida.getModo()}</Text>
                        <Text style={styles.text}>Pista: {partida.getPista()}</Text> 
                        <Text style={styles.text}>Vueltas: {partida.getVueltas()}</Text> 
                    </View>
                    <View style={styles.tablero}>
                        {generarTablero()}
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.botonVolver} onPress={() => volverInicio()}>
                <Text style={styles.text}>Volver</Text>
            </TouchableOpacity>
        </View>
    );

}
export default Estadisticas;
