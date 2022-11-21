export default class Usuario {
    constructor(socket,nickName){
        this.state = {
            socket: socket,
            nickName: nickName,
            tipo: "usuario",
            ficha:{
                color: "red",
                posicion: {
                    x: 0,
                    y: 0
                }
            }
        };
    }

    setPosicion(posicion){
        this.state.ficha.posicion = posicion;
    }

    getSocket(){
        return this.state.socket;
    }

    getNickName(){
        return this.state.nickName;
    }

    setSocket(socket){
        this.state.id = socket;
    }

    setNickName(nickName){
        this.state.nickName = nickName;
    }

    toString(){
        return "socket: "+this.state.socket.id+" nickName: "+this.state.nickName;
    }
    
    getTipo(){
        return this.state.tipo;
    }

    setTipo(tipo){
        this.state.tipo = tipo;
    }

    toJson(){
        return [this.state.nickName,
                this.state.socket.id,
                this.state.tipo,
                this.state.ficha];

    }

    
}