import { StyleSheet, SafeAreaView, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.buttons}>
            <TouchableOpacity style={styles.nav} onPress={() => navigation.navigate('Scale')}>
                <Text>Journal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nav}>
                <Text>Forum</Text>
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
        justifyContent: 'center'
    },
    buttons: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    nav: {
        backgroundColor: 'lightblue',
        width: 100,
        height: 50,
        marginBottom: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})