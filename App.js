import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SplashScreen from './screens/SplashScreen';
import Tabs from './screens/Tabs';



// Criação da stack de navegação
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen options={{ headerShown: false}} name="SplashScreen" component={SplashScreen} />
        <Stack.Screen options={{ headerShown: false}} name="Welcome" component={WelcomeScreen} />
        <Stack.Screen options={{ headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false}} name="Main" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({});
