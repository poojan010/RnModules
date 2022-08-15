import React, { FC } from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { setNavigator } from "./navHelper";

import Main from "containers/Main";
import OtpInputDemo from "containers/OtpInputDemo";



const Stack = createNativeStackNavigator()

const Routers = () => {

    return (
        <NavigationContainer
            ref={(ref) => setNavigator(ref)}
        >
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                {/* <Stack.Screen name="Main" component={Main} /> */}
                <Stack.Screen name="OtpInputDemo" component={OtpInputDemo} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routers