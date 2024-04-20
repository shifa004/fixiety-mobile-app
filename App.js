import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet,Dimensions, Image,Text, TextInput, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Scale from './components/Scale';
import Forum from './components/Forum';
import ForumDetails from './components/ForumDetails';
import CreateThread from './components/CreateThread';
import MyTabs from './components/MyTabs';
import Feel from './components/Feel';
import Journal from './components/Journal';
import JournalCalendar from './components/JournalCalendar';
import WelcomePage from './components/WelcomePage';
import Entry from './components/Entry';
import UserProfile from './components/UserProfile';
import {AntDesign,Entypo} from 'react-native-vector-icons';
import { useState } from 'react';
import MyDrawer from './components/MyDrawer';
import Settings from './components/Settings';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Stack = createNativeStackNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef()  
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="WelcomePage" screenOptions={{
        // headerStyle:{
        //   backgroundColor:'white',
        // },
        // headerTintColor: 'white',
        // headerTitleStyle: {
        //   color: 'black',
        //   justifyContent: 'center'
        // }, 

      }}>
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown: false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
        <Stack.Screen name='MyDrawer' component={MyDrawer} options={{headerShown: false}} />
        <Stack.Screen name='Scale' component={Scale} options={{title: 'Scale', headerShown:false}}/>
        <Stack.Screen name='Feel' component={Feel} options={{title: 'Feel', headerShown:false}}/>
        <Stack.Screen name='Journal' component={Journal} options={{title: 'Journal', headerShown:false}}/>
        <Stack.Screen name='Forum' component={Forum} options={{title: 'Forum'}}/>
        <Stack.Screen name='JournalCalendar' component={JournalCalendar} options={{
          // headerShown: false
          }}/>
        <Stack.Screen name='Entry' component={Entry} options={{headerShown: false}}/>
        <Stack.Screen name='ForumDetails' component={ForumDetails} options={{title: 'Thread'}}/>
        <Stack.Screen name='CreateThread' component={CreateThread} options={{title: 'Create',  headerShown:false}}/>
        <Stack.Screen name="MyTabs" component={MyTabs} options={{headerShown:false, title: 'Forum'}}/>
        <Stack.Screen name="Settings" component={Settings} options={{title: 'Settings'}}/>
        <Stack.Screen name="UserProfile" component={UserProfile} options={{title: 'Profile'}}/>
     </Stack.Navigator>
    </NavigationContainer>
  );
}
