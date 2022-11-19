import React,{Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../routes/Home';
import PantallaSeleccion from '../routes/PantallaSeleccion';
import CrearPartida from '../routes/CrearPartida';
import io from 'socket.io-client';
import Lobby from '../routes/Lobby';
import ListaPartidas from '../routes/ListaPartidas';
import Juego from '../routes/Juego';
const socket = io.connect('http://localhost:3001');


const Stack = createStackNavigator();
//https://reactnavigation.org/docs/getting-started/#minimum-requirements
//se utiliza para crear las rutas de la aplicación
export default class StackNav extends Component{
    render(){
        return(
            /* crea un stack de navegación */
            <Stack.Navigator> 
                <Stack.Screen name="Home" component={Home} initialParams={{'pSocket':socket}}/>
                <Stack.Screen name="PantallaSeleccion" component={PantallaSeleccion} />
                <Stack.Screen name="CrearPartida" component={CrearPartida} />
                <Stack.Screen name="Lobby" component={Lobby} />
                <Stack.Screen name="ListaPartidas" component={ListaPartidas} />
                <Stack.Screen name='Juego' component={Juego} />
            </Stack.Navigator>
        );
    }
}