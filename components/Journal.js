import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, SafeAreaView, Dimensions, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {AntDesign} from 'react-native-vector-icons';
import {doc, setDoc, collection, getDocs, query, where} from "firebase/firestore";
import { db, auth } from './config';
import Success from './Success';


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Journal = ({ route, navigation }) => {
  const [entry, setEntry] = useState('');
  const [disabled,setDisabled]=useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
      } else {
        // No user is signed in
        setCurrentUser(null);
      }
    });  return () => unsubscribe();
  }, []);

  useEffect(()=>{
    getName()
    return ()=>{}
  },) 

  const changeInput = (e) => {
    if (e === '') {
      setEntry(e)
      setDisabled(true)
    }
    else {
      setEntry(e)
      setDisabled(false)
    }
  }

  const getCurrentDate = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    var now = new Date();
    var dayOfWeek = days[now.getDay()];
    var date = now.getDate(); 
    var month = months[now.getMonth()];
    var year = now.getFullYear();

    return `${dayOfWeek}, ${date} ${month} ${year}`;
  };

  const formatDate=()=>{ 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '-' + month + '-' + year;
  }

  const getName = async () => {
    const q = query(collection(db, "accounts"), where("email", "==", currentUser.email));
    const docs = await getDocs(q);
    let x = ''
    docs.forEach((doc) => {
      x = doc.data().username
    });
    setUsername(x)
  }

  async function addEntry() {
      const currentDate = formatDate();
      const docRef = doc(db, "entries", currentDate)
      let name = username;
      await setDoc(docRef, {
        username: name,
        score: route.params.anxietyScore,
        feel: route.params.feel,
        entry: entry,
      }, {merge: true})
      .then(()=> console.log("Document written with ID: ", docRef.id))
      .catch((error) => {
          console.error("Error adding document: ", error);
      })
  }
  
  const handleJournal = async () => {
    await addEntry(); 
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('JournalCalendar', {username: username})
  };

  getName()
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? "padding" : "height"}>  
        <View style={styles.close}>
        <TouchableOpacity style={{marginLeft: screenWidth*0.05}} onPress={() => navigation.navigate({ name: 'Feel', params: { feel: route.params.feel }, merge: true })}>
            <AntDesign name='arrowleft' size={35}></AntDesign>
        </TouchableOpacity>
        <Text style={{color: "#01377D"}}>{getCurrentDate()}</Text>
        <TouchableOpacity style={{marginRight: screenWidth*0.05}} onPress={() => navigation.navigate('Home')}>
            <AntDesign name='close' size={35}></AntDesign>
        </TouchableOpacity>
        </View>
        <Text style={styles.title}>What did you do today? What did you do well today? What could you have done differently?</Text>
        <View style={styles.input}>
            <TextInput
                multiline
                placeholder="Type your journal entry here..."
                style={styles.textInput}
                value={entry}
                onChangeText={(e) => changeInput(e)}
            />
        </View>
        <TouchableOpacity style={[styles.button, { backgroundColor: disabled ? 'white' : '#01377D' }]} disabled={disabled} onPress={handleJournal}>
          <Text style={[styles.buttonText, { color: disabled ? 'darkgrey' : 'white' }]}>Next</Text>
        </TouchableOpacity>
        <Success visible={isModalVisible} onClose={closeModal} />
      </KeyboardAvoidingView>
  );
};

export default Journal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    padding: screenWidth*0.05,
  },
  close: {
    marginTop: screenHeight*0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth,
    alignItems: 'center',
    marginBottom: screenHeight*0.03
  },
  title: {
    color: "#01377D",
    textAlign: 'center',
    fontSize: screenWidth*0.05,
    marginBottom: screenHeight*0.03,
  },
  input: {
    flex: 1, 
    width: '100%',
    alignItems: 'center',
    marginBottom: screenHeight*0.03,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#01377D',
    backgroundColor: 'white',
    padding: screenWidth*0.05,
    height: '100%',
    width: screenWidth*0.8,
    textAlignVertical: 'top',
  },
  button: {
    width: screenWidth*0.25,
    height: screenHeight*0.07,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',    
    fontSize: screenWidth*0.045,
  },
});