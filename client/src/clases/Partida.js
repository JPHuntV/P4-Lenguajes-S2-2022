export default class Partida {
    constructor(codigo,modo,pista,vueltas,tiempo,cantJugadores){
        this.state = {
            codigo: codigo, //string
            modo: modo,//string
            pista: pista,//string
            vueltas: vueltas,//int
            tiempo: tiempo,//int
            cantJugadores: cantJugadores,//int
            creador: null,//json
            jugadores: [], //array de json
            estado: "esperando", //string
            tablero: []
        };
    }

    getTablero(){
        return this.state.tablero;
    }

    setTablero(tablero){
        this.state.tablero = tablero;
    }
    

    getEstado(){
        return this.state.estado;
    }

    setEstado(estado){
        this.state.estado = estado;
    }

    getCreador(){
        return this.state.creador;
    }

    setCreador(creador){
        this.state.creador = creador;
    }

    getCodigo(){
        return this.state.codigo;
    }

    setCodigo(codigo){
        this.state.codigo = codigo;
    }

    getModo(){
        return this.state.modo;
    }   

    getPista(){
        return this.state.pista;
    }

    getVueltas(){
        return this.state.vueltas;
    }

    getTiempo(){        
        return this.state.tiempo;
    }

    getCantJugadores(){                        
        return this.state.cantJugadores;
    }

    setModo(modo){
        this.state.modo = modo;
    }   

    setPista(pista){
        this.state.pista = pista;
    }   

    setVueltas(vueltas){
        this.state.vueltas = vueltas;
    }   

    setTiempo(tiempo){
        this.state.tiempo = tiempo;
    }   

    setCantJugadores(cantJugadores){
        this.state.cantJugadores = cantJugadores;
    }

    getJugadores(){
        return this.state.jugadores;
    }

    setJugadores(jugadores){
        this.state.jugadores = jugadores;

    }

    agregarJugador(jugador){
        this.state.jugadores.push(jugador);
        console.log("Jugador agregado");
        console.log(this.state.jugadores);
    }

    getCantidadJugadores(){
        return this.state.jugadores.length;
    }

    eliminarJugador(jugador){
        let index = this.state.jugadores.indexOf(jugador);
        if(index > -1){
            this.state.jugadores.splice(index,1);
        }
    }

    tojson(){
        return JSON.stringify({
            codigo: this.state.codigo,
            modo: this.state.modo,
            pista: this.state.pista,
            vueltas: this.state.vueltas,
            tiempo: this.state.tiempo,
            cantJugadores: this.state.cantJugadores,
            creador: this.state.creador,
            jugadores: this.state.jugadores
        });
    }

    fromJson(json){
        this.state = json;
    }


    toString(){
        return "Creador: " + this.state.creador +  " Sala: "+this.state.codigo + " Modo: "+this.state.modo+" Pista: "+this.state.pista+" Vueltas: "+this.state.vueltas+" Tiempo: "+this.state.tiempo+" Jugadores: "+this.state.cantJugadores+" jugadores conectados: "+this.state.jugadores.length + " Estado: "+this.state.estado;
    }

}