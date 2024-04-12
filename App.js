import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet,Dimensions, Image,Text, TextInput, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Scale from './components/Scale';
import Feel from './components/Feel';
import {AntDesign,Entypo} from 'react-native-vector-icons';
import { useState } from 'react';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef()  
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{
        headerStyle:{
          backgroundColor:'white',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          color: 'black',
          justifyContent: 'center'
        }, 
      }}>
        <Stack.Screen name='Login' component={Login} options={{title: 'Login'}}/>
        <Stack.Screen name='Scale' component={Scale} options={{title: 'Scale'}}/>
        <Stack.Screen name='Feel' component={Feel} options={{title: 'Feel'}}/>
     </Stack.Navigator>
    </NavigationContainer>
  );
}