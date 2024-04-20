import { StyleSheet, TextInput, View,TouchableOpacity,Text,KeyboardAvoidingView, Alert } from 'react-native'
import React,{useEffect, useState} from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from './config';
import { doc, getDoc } from "firebase/firestore";

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
        }
        console.log('Logged in')
        setSignedIn(true)
        console.log("Email retrieved from docSnap:", docSnap.data().email);
        navigation.navigate('MyDrawer', {email: docSnap.data().email})
    })
    .catch((error) => {console.log(error.message);
    setSignedIn(false)})
  }
  
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

        <Text>Don't have an account?</Text>
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