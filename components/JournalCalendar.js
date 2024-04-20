import { StyleSheet, Text, SafeAreaView, View, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import {doc, setDoc, getDocs, addDoc, collection} from "firebase/firestore";
import { db } from './config';
import {Card, Avatar } from '@rneui/themed';
import { MaterialCommunityIcons} from 'react-native-vector-icons';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const JournalCalendar = ({route,navigation}) => {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    readAll();
  });

  const readAll = async () => {
    const docs = await getDocs(collection(db, "entries"));
    const temp = []
    docs.forEach((doc) => {
      let t = {}
      t['date'] = doc.id
      t['entry'] = doc.data().entry
      t['feel'] = doc.data().feel
      t['score'] = doc.data().score
      temp.push(t)     
    });
    temp.sort((a, b) => parseDate(a.date) - parseDate(b.date));
    setEntries([...temp]);

  } 

  const getCurrentDate=()=>{ 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + '-' + month + '-' + year;
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
  }
})