import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Partida from "../clases/Partida";

function TestTablero({partida}) {

    const getMatrixTablero = () => {
            let pista = require('../pistas/pista1.csv');
            let matriz=[];
            fetch(pista)
            .then(response => response.text())
            .then(text => {
                let lista = text.split("\r\n");
                lista.pop();
                lista.forEach(fila => {
                    let filaMatriz = fila.split(",");
                    matriz.push(filaMatriz);
                });
            })
            .catch(error => console.log(error));
            return matriz;
        }
    const [matriz, setMatriz] = useState(getMatrixTablero());
    const [tablero, setTablero] = useState([]);

    useEffect(() => {
        console.log("useEffect");
        let tab = getMatrixTablero();
    }, []);


     
    const generarTablero = (mat) =>{
        console.log("generarTablero");
        console.log(mat);
        let matriz = mat;   
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
        console.log(tablero);
        return tablero;
    }

    

    return (
        
            <View style={styles.tablero}>
                {generarTablero(matriz)}
            </View>

    );
}export default TestTablero;
const styles = StyleSheet.create({
    fila: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    celda: {
        borderColor: "black",
        width: '0.66vw',
        height: '0.66vw',
        justifyContent: "center",
        alignItems: "center",
        
    },
    tablero: {
        borderWidth: 1,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    celdaPared: {
        borderWidth: 1,
        borderColor: "black",
        width: 15,
        height: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
    },
    //ficha circular
    celdaFicha: {
        borderWidth: 1,
        borderColor: "black",
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: usuario.getFicha().color,
        borderRadius: 10,
    },



 

});