import React,{Component} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../routes/Home';
import PantallaSeleccion from '../routes/PantallaSeleccion';
import CrearPartida from '../routes/CrearPartida';
import io from 'socket.io-client';

import Lobby from '../routes/Lobby';
import ListaPartidas from '../routes/ListaPartidas';
import Juego from '../routes/Juego';
import Estadisticas from '../routes/Estadisticas';
import Ranking from '../routes/Ranking';
//const socket = io.connect('http://localhost:3001');
const socket = io.connect('http://152.231.203.141:8080');




const Stack = createStackNavigator();
//https://reactnavigation.org/docs/getting-started/#minimum-requirements
//se utiliza para crear las rutas de la aplicación
export default class StackNav extends Component{
    render(){
        return(
            /* crea un stack de navegación */
            

            <Stack.Navigator
                screenOptions={{
                    animationEnabled: true,
                    animationTypeForReplace: 'push',
                    headerStyle: {
                        backgroundColor: '#191919',  
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontSize: 26,
                        fontWeight: 'bold',
                    },
                    headerTintColor: '#ffffff',
                }
                }
            > 
                <Stack.Screen 
                    name="Home" 
                    component={Home} 
                    initialParams={{'pSocket':socket}} 
                    options={{
                        headerShown:false,
                        cardStyle:{
                            backgroundColor: '#1e1f1e'
                        }
                    }}/>
                <Stack.Screen 
                    name="PantallaSeleccion" 
                    component={PantallaSeleccion}
                    options={{
                        title: 'Menú principal',
                    }} />
                <Stack.Screen 
                    name="CrearPartida" 
                    component={CrearPartida} 
                    options={{
                        title:'Crear partida'
                    }}/>
                <Stack.Screen name="Lobby" component={Lobby} />
                <Stack.Screen 
                    name="ListaPartidas" 
                    component={ListaPartidas} options={{
                        title: 'Partidas disponibles',
                    }} />
                <Stack.Screen name='Juego' component={Juego} />
                <Stack.Screen name='Estadisticas' component={Estadisticas} />
                <Stack.Screen name='Ranking' component={Ranking} />
            </Stack.Navigator>
            
        );
    }
}