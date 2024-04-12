import { StyleSheet, TextInput, View,TouchableOpacity,Text,KeyboardAvoidingView } from 'react-native'
import React,{useEffect, useState} from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './config';

const Login = ({navigation}) => {

  useEffect(()=> setSignedIn(false),[])
  
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {console.log("registered")
      alert("Registered")})
    .catch((error) => console.log(error.message))
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        console.log('Logged in')
        setSignedIn(true)
       navigation.replace('Journal')
    })
    .catch((error) => {console.log(error.message);
    setSignedIn(false)})
  }
  
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput placeholder='Email' value={email} onChangeText={text =>  setEmail(text)} style={styles.input} autoCorrect={false} autoCapitalize={'none'}/>
        <TextInput placeholder='Password' value={password} onChangeText={text =>  setPassword(text)} style={styles.input}secureTextEntry/>
      </View>
      <View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonOutLine]} onPress={handleRegister}>
          <Text style={[styles.buttonText, styles.buttonOutLineText]}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    fontSize: 18,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5
  },
  inputContainer: {
    width: '80%'
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#0782F9',
    borderRadius: 10,
    padding: 15
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  buttonOutLine: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2
  },
  buttonText: {
    fontWeight: '700',
    color: 'white',
    fontSize: 16
  },
  buttonOutLineText: {
    fontWeight: '700',
    color: '#0782F9',
    fontSize: 16
  }
})