import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Productos from "../screens/Productos";
import DetTotal from "../screens/DetTotal";
import Perfil from "../screens/Perfil";

const Stack = createStackNavigator();
export default function ProductosStack(){
    return(
        <Stack.Navigator 
            screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen 
            name="productos"
            component={Productos}
            options={{title:"Aprobar Pedidos"}} />
            <Stack.Screen 
            name="dettotal"
            component={DetTotal}
            options={{title:"Detalle de Pedido"}} />
            <Stack.Screen 
            name="perfil"
            component={Perfil}
            options={{title:"Perfil"}} />
        </Stack.Navigator>
        
    );
}