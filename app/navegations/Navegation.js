import React, { useState,useRef, useEffect, useMemo } from "react";
import {NavigationContainer} from "@react-navigation/native";
import ProductosStack from "../navegations/ProductosStack";
import PerfilStack from "../navegations/PerfilStack";
import RentableStack from "../navegations/RentableStack";
import RentxVendStack from "../navegations/RentxVendStack";
import { Icon } from "react-native-elements";
import LoginForm from "./LoginForm";
import { AuthContext } from "../components/Context"
import Productos from "../screens/Productos";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ItemsStack from "./ItemsStack";





const Tab = createBottomTabNavigator();


const STORAGE_KEY = '@save_data'


export default function Navigation(props){ 
    const {toastRef} = props;
    const [userToken, setUserToken] = React.useState(null);
    const [paso, setPaso] = React.useState(0);
    const [chargue, setChargue] = React.useState(0);

    const authContext = React.useMemo(() => ({
        signIn: () => {
            setUserToken('keyrubik');
            setChargue(0);
        },
        signUp: () => {
            setUserToken('keyrubikload');
            setChargue(1);
        },
        signOut: () => {
            setUserToken(null);
            setChargue(0);
        },
    }))

    const getDataLogin = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if(chargue == 0){
                authContext.signIn();
                console.log("se logoneo")
            }else if(chargue == 1){
                console.log("se cargo")
            }else{
                authContext.signOut();
                console.log("sin login")
        }
        } catch(e) {
           console.log(e)
        }
    }
    useEffect(() =>{
        getDataLogin();
    },[])
    



    
    return(
        <AuthContext.Provider value={authContext}>
        <NavigationContainer> 
            {(chargue == 0) ?  <LoginForm  toastRef={toastRef} />  : 
            <Tab.Navigator
            initialRouteName="AprobarPedidos"
            tabBarOptions={{
              inactiveTintColor: "#646464",
              activeTintColor: "#00a680",
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => screenOptions(route, color),
              })}
            >
                <Tab.Screen 
                    name="productos" 
                    component={ProductosStack}
                    options={{title: "Pedidos"}} 
                    />
                    <Tab.Screen c
                    name="rentable" 
                    component={RentableStack}
                    options={{title: "Rentabilidad"}}  />
                   {/*<Tab.Screen 
                    name="rentable2" 
                    component={RentxVendStack}
            options={{title: "Rent. x vendedor"}}  />*/}
                    <Tab.Screen 
                    name="Precios" 
                    component={ItemsStack}
                    options={{headerShown: false}}
                    />
                    <Tab.Screen 
                    name="perfil" 
                    component={PerfilStack}
                    options={{title: "Perfil"}}  />
            </Tab.Navigator>}
                </NavigationContainer>
                </AuthContext.Provider>
          
    );
}

function screenOptions(route, color){
    let iconName;
    switch(route.name){
        case "productos":
            iconName = "shopping";
            break;
        case "perfil":
            iconName = "account-circle";
            break;
        case "rentable":
                iconName = "chart-areaspline";
                break;
        case "rentable2":
                    iconName = "chart-areaspline";
                    break;
        case "Precios":
                iconName = "format-list-bulleted";
                break;
        default: 
            break;
    }
    return(
        <Icon type="material-community" name={iconName} size={22} color={color} />
    )
}