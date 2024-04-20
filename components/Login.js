import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, KeyboardAvoidingView, Platform, Image, Alert, Dimensions } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from './config';
import { doc, getDoc } from "firebase/firestore";

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Login = ({navigation}) => {

  useEffect(()=> setSignedIn(false),[])
  
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleRegister = () => {
    navigation.navigate('Register')
  }

  const handleLogin = () => {
    if (!email || !password) {
        Alert.alert('Error', 'All fields are required');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;
        const docRef = doc(db, "accounts", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        Alert.alert('Error', 'Invalid email or password');
        setSignedIn(false);
        }
        console.log('Logged in')
        setSignedIn(true)
        console.log("Email retrieved from docSnap:", docSnap.data().email);
        navigation.navigate('MyDrawer', {email: docSnap.data().email})
    })
    .catch((error) => {
      console.log(error.message);
      setSignedIn(false)
      Alert.alert('Error', 'Login failed. Please try again.');
    })
  }
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : "height"} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/login.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>sign in to access your account</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Enter your email'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerText}>New Member? <Text style={styles.registerNowText}>Register now</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: screenHeight*0.03,
  },
  logo: {
    height: screenHeight*0.4,
    width: screenWidth*0.9
  },
  title: {
    fontSize: screenWidth*0.08,
    fontWeight: 'bold',
    color: '#01377D',
  },
  subtitle: {
    fontSize: screenWidth*0.04,
    color: '#666',
  },
  inputContainer: {
    width: screenWidth*0.8,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: screenWidth*0.04,
    paddingVertical: screenHeight*0.015,
    borderRadius: 10,
    marginTop: screenHeight*0.03,
    fontSize: screenWidth*0.04,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#89ABE3', // Reddish color for the button
    padding: screenWidth*0.035,
    borderRadius: 10,
    marginTop: screenHeight*0.03,
    width: screenWidth*0.8,
    alignItems: 'center',
  },
  buttonContainer: {
    width: screenWidth*0.6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: screenWidth*0.045,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: screenHeight*0.03,
    color: '#666',
  },
  registerNowText: {
    color: '#01377D',
    fontWeight: 'bold',
  },
});