import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer,useNavigationContainerRef } from '@react-navigation/native';
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Forum from './Forum'
import CreateThread from './CreateThread';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();
const MyTabs = ({email}) => {
    console.log("in tabs", email)
  return (
    
<SafeAreaView style={styles.container}>
    <Tab.Navigator screenOptions={{headerShown:true,
    tabBarActiveTintColor: 'grey'}}>
    
    <Tab.Screen name="Forum" component={Forum} />
    <Tab.Screen name="Create" component={CreateThread} 
     initialParams={{email:email}}/>
  </Tab.Navigator>
  </SafeAreaView>
  )
}

export default MyTabs

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})