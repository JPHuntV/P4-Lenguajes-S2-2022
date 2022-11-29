export const style ={
    container: {
        flex: 1,
        alignItems: "center",
        //justifyContent: "center",
        backgroundColor: "#0c0c0c",

    },
    gamesContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "1vw",
        margin: "2vw",
        backgroundColor: "#0c0c0c",
        width: "99vw",
    },

    gameCard: {
        backgroundColor: "#191919",
        flex: '0 0 32.33%',
        flexDirection: "row",
        height: '20vh',
        minWidth: '32.33vw',
        borderRadius: 10,
        paddingRight: '1vw',
        alignItems: 'center',    
    },
    gameImage: {
        width: '20vh',
        height: '20vh',
        backgroundColor: "#0c0c0c",
    },
    gameInfo: {
        backgroundColor: "#191919",
        flex: 1,
        flexDirection: "column",
        width: '50%',
    },
    imagenUsuario: {
        width: '5vw',
        height: '5vw',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#ffffff",
        marginTop: '2vh',
        marginLeft: '3vw',
        marginRight: 'vw',
    },
    head: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0c0c0c",
        width: "100%",
        marginVertical: '1vh',
    },
    text: {
        color: "#ffffff",
        fontSize: 16,
        width: '100%',
        paddingLeft: '1vw',
        marginVertical: '1vh',
    },
}