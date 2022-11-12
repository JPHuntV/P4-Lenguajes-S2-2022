export default class Partida {
    constructor(modo,pista,vueltas,tiempo,cantJugadores){
        this.state = {
            modo: modo,
            pista: pista,
            vueltas: vueltas,
            tiempo: tiempo,
            cantJugadores: cantJugadores,
            jugadores: []
        };
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
    }

    eliminarJugador(jugador){
        let index = this.state.jugadores.indexOf(jugador);
        if(index > -1){
            this.state.jugadores.splice(index,1);
        }
    }

    

    toString(){
        return "Modo: "+this.state.modo+" Pista: "+this.state.pista+" Vueltas: "+this.state.vueltas+" Tiempo: "+this.state.tiempo+" Jugadores: "+this.state.cantJugadores;
    }

}