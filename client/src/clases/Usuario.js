export default class Usuario {
    constructor(socket,nickName){
        this.state = {
            socket: socket,
            nickName: nickName,
            tipo: "usuario"
        };
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
        return JSON.stringify([this.state.nickName,this.state.socket.id,this.state.tipo]);
    }

    fromJson(json){
        let lista = JSON.parse(json);
        this.state.nickName = lista[0];
        this.state.socket.id = lista[1];
        this.state.tipo = lista[2];
    }

    fromList(lista){
        this.state.nickName = lista[0];
        this.state.socket.id = lista[1];
        this.state.tipo = lista[2];
    }
}