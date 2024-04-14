import { StyleSheet, SafeAreaView, TouchableOpacity, View, Text, Dimensions } from 'react-native'
import React from 'react'
import { useEffect } from 'react';


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Home = ({route , navigation}) => {
    const {email, username}  = route.params;
    console.log("in home", email, username)
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.buttons}>
            <TouchableOpacity style={styles.nav} onPress={() => navigation.navigate('Scale')}>
                <Text style={styles.txt}>Journal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nav} onPress={() => navigation.navigate('MyTabs', {email: email})}>
                <Text style={styles.txt}>Forum</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#F0E4D7'
    },
    buttons: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    nav: {
        backgroundColor: '#f4acb7',
        width: 100,
        height: 50,
        marginBottom: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        color:'#333333'
    }
})