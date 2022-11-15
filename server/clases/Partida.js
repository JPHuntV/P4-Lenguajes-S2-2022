// clase partida server
export default class Partida {
    constructor(codigo,modo,pista,vueltas,tiempo,cantJugadores){
        this.state = {
            codigo: codigo,
            modo: modo,
            pista: pista,
            vueltas: vueltas,
            tiempo: tiempo,
            cantJugadores: cantJugadores,
            creador: null,
            jugadores: []
        };
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



    toString(){
        return "Creador: " + this.state.creador.getNickName() +  " Sala: "+this.state.codigo + " Modo: "+this.state.modo+" Pista: "+this.state.pista+" Vueltas: "+this.state.vueltas+" Tiempo: "+this.state.tiempo+" Jugadores: "+this.state.cantJugadores;
    }

}