export const style ={
    container: {
        flex: 1,
        backgroundColor: '#0c0c0c',
        alignItems: 'center',
        justifyContent: 'center',
        //flexDirection: "row"
    },
    rowContainer: {
        //flex: 1,
        flexDirection: "row",
        //alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0c0c0c",
        width: "100vw",
        height: "80vh",
        marginTop: '1vh',

        paddingTop: '2vh',
        paddingBottom: '2vh',
    },
    containerColores: {
        backgroundColor: '#191919',
        flexDirection: "column",
        marginHorizontal: '2vw',
        height: "100%",
        width: "55%",
        alignItems: 'center',
        //justifyContent: 'center',
    },

    containerJugadores: {
        backgroundColor: '#ff002e',
        flexDirection: "column",
        marginHorizontal: '2vw',
        height: "100%",
        width: "25%",
        alignItems: 'center',
        borderRadius: 10,
    },
    jugadoresScroll: {
        backgroundColor: '#191919',
        width: "100%",
        flexWrap: "wrap",
        paddingVertical: '1vh',
    },
   
   
    containerInfo: {
        backgroundColor: '#ff002e',
        flexDirection: "row",
        marginHorizontal: '2vw',
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3vw',
    },

    itemPosiciones: {
        backgroundColor: "white",
        alignContent: "center",
        flexDirection: "row",
        //justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 15,
        paddingHorizontal: 15,
        height: '8vh',
    },

    fila: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "White",
        width: "100%",
        height: "4%",
    },
    celda: {
        //borderWidth: 1,
        borderColor: "black",
        width: '4%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        
    },
    imagenCelda: {
        width: '100%',
        height: '100%',
        position: "absolute",
        resizeMode: "stretch",
    },

    tablero: {
        //borderWidth: 1,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '96%',
        marginTop: 'auto',
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    
    textPosiciones: {
        fontSize: 20,
        color: 'black',
        //flex:'0 0 33.33%',
        //
        width: '33.33%',
        textAlign: 'center',
        
    },
    botonVolver: {
        backgroundColor: "#ff002e",
        width: "40vh",
        height: "5vh",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    }
}