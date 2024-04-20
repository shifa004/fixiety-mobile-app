import { StyleSheet, Text, SafeAreaView, View, Dimensions, TouchableOpacity, ScrollView, LogBox } from 'react-native'
import React, {useState, useEffect} from 'react'
import {doc, setDoc, getDocs, addDoc, collection, query, where} from "firebase/firestore";
import { db, auth } from './config';
import {Card, Avatar } from '@rneui/themed';
import { MaterialCommunityIcons} from 'react-native-vector-icons';

// Suppress specific warnings
LogBox.ignoreAllLogs();

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const JournalCalendar = ({route,navigation}) => {
  const [entries, setEntries] = useState([]);
  const [todayEntryExists, setTodayEntryExists] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState();

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

  useEffect(() => {
    readAll();
    return ()=>{}
  });

  const getName = async () => {
    const q = query(collection(db, "accounts"), where("email", "==", currentUser?.email));
    const docs = await getDocs(q);
    let x = ''
    docs.forEach((doc) => {
      x = doc.data().username
    });
    setUsername(x)
  }

  const readAll = async () => {
    const originalDate = getCurrentDate();
    const parts = originalDate.split('-');
    const todayDateString = `${parseInt(parts[2], 10)}-${parseInt(parts[1], 10)}-${parts[0]}`;
    try {
      if (currentUser.email){
      const q = query(collection(db, "entries"), where("username", "==", username));
      const docs = await getDocs(q);
      const temp = [];
      docs.forEach((doc) => {
        let t = {};
        t['date'] = doc.id;
        t['entry'] = doc.data().entry;
        t['feel'] = doc.data().feel;
        t['score'] = doc.data().score;
        temp.push(t);
        if (doc.id === todayDateString) {
          setTodayEntryExists(true);
        }      
      });
      temp.sort((a, b) => parseDate(a.date) - parseDate(b.date));
      setEntries([...temp]);
    }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  
  const getCurrentDate = () => { 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return `${year}-${month}-${date}`;
  }

  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  const emojis = [
    { name: 'emoticon-happy-outline', label: 'Happy', color: "green" },
    { name: 'emoticon-neutral-outline', label: 'Neutral', color: "grey" },
    { name: 'emoticon-sad-outline', label: 'Sad', color: "red"},
  ];

  const findEmojiByLabel = (label) => {
    return emojis.find(emoji => emoji.label.toLowerCase() === label.toLowerCase());
  };

  return (
    <SafeAreaView style ={styles.container}>
      <ScrollView contentContainerStyle ={styles.all}>
      <TouchableOpacity
          style={styles.logButton}
          onPress={() => {
            if (!todayEntryExists) {
              navigation.navigate('Scale'); // Assuming 'Scale' is the name of your component to log an entry
            }
          }}
          disabled={todayEntryExists}
        >
        <Text style={[styles.logButtonText, {color: todayEntryExists ? 'grey' : 'black',}]}>Log Today's Mood</Text>
        </TouchableOpacity>
        {(entries.map((x, i) => {
          const e = findEmojiByLabel(x.feel);
          return (
          <TouchableOpacity key={i} onPress={() => navigation.navigate('Entry', {e: x})}>
            <Card containerStyle={styles.entry} >
              <View style={styles.fields}>
                <Text style={styles.date}>{x.date}</Text>
              </View>
                <View style={styles.content}>
                <View>
                  <MaterialCommunityIcons name={e.name}  color={e.color} size={60}/> 
                </View>
                <View style={styles.score}>
                  <Text style={styles.scr}>Anxiety Score: {x.score}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
          );      
        }))
      }
      </ScrollView>
    </SafeAreaView>
  )
}

export default JournalCalendar

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
  },
  fields: {
    alignItems:'center',
  },
  date: {
    fontSize: screenWidth*0.05,
  },
  entry: {
    borderRadius: 10,
    margin: screenHeight*0.02,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    padding: screenHeight*0.02,
  },
  content: {
    flexDirection:'row',
    justifyContent: 'space-evenly'
  },
  score: {
    justifyContent: 'center',
  },
  scr: {
    fontSize: screenWidth*0.04
  },
  logButton: {
    width: screenWidth - 40, // Subtracts the margins on the left and right
    backgroundColor: '#e0e0e0', // Placeholder color
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  logButtonText: {
    fontWeight: 'bold',
  },
})