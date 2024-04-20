import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const WelcomePage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Fixiety</Text>
      <Image source={require("../assets/welcome.png")} style={styles.image} />
      
      <Text style={styles.tagline}>Embrace calmness, manage anxiety</Text>
      
      <TouchableOpacity style={[styles.button, {backgroundColor: '#89ABE3'}]} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, {backgroundColor: '#01377D'}]} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    // backgroundColor: '#C4BFE7'
  },
  welcomeText: {
    fontSize: screenWidth*0.08,
    fontWeight: 'bold',
    color: '#01377D',
    marginBottom: screenHeight*0.02,
  },
  tagline: {
    fontSize: 18,
    color: '#01377D',
    marginBottom: screenHeight*0.04,
  },
  image: {
    width: screenWidth*0.9,
    height: screenHeight*0.25,
    marginBottom: 20,
  },
  button: {
    height: screenHeight*0.07,
    width: screenWidth*0.5,
    borderRadius: 10,
    marginTop: screenHeight*0.01,
    marginBottom: screenHeight*0.02,
    justifyContent:"center"
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: screenWidth*0.05,
    fontWeight: 'bold',
  }
});
