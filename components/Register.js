import { StyleSheet, TextInput, View,TouchableOpacity,Text,KeyboardAvoidingView, Alert } from 'react-native'
import React,{useEffect, useState} from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from './config';

const Register = ({navigation}) => {
  useEffect(()=> setSignedIn(false),[])
  
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  
  const handleRegister = () => {
    if (!email || !password || !username) {
        Alert.alert('Error', 'All fields are required');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        console.log(userCredential)
        const user = userCredential.user;
        const userId = user.uid;

        const docRef = doc(db, "accounts", userId)
        await setDoc(docRef, {username: username, email: email}, {merge:true})
        .then(() => { console.log('data submitted') })
        .catch((error) => { console.log(error.message) })    

        console.log("registered")
        navigation.navigate("Login")
    })
    .catch((error) => console.log(error.message))
  }

  const handleLogin = () => {
    navigation.navigate('Login');
  }
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
      <TextInput placeholder='Username' value={username} onChangeText={text =>  setUsername(text)} style={styles.input} autoCorrect={false} autoCapitalize={'none'}/>
        <TextInput placeholder='Email' value={email} onChangeText={text =>  setEmail(text)} style={styles.input} autoCorrect={false} autoCapitalize={'none'}/>
        <TextInput placeholder='Password' value={password} onChangeText={text =>  setPassword(text)} style={styles.input}secureTextEntry/>
      </View>
      <View>
      </View>
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity style={[styles.button, styles.buttonOutLine]} onPress={handleRegister}>
          <Text style={[styles.buttonText, styles.buttonOutLineText]}>Register</Text>
        </TouchableOpacity>

        <Text> Have an account?</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Register

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