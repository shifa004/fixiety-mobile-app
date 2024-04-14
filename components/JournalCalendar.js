import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import {doc, setDoc, addDoc, collection} from "firebase/firestore";
import { db } from './config';


const JournalCalendar = ({route, navigation}) => {
  const getCurrentDate=()=>{
 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: d-m-y;
  }

  useEffect(() => {
    async function addEntry() {
      if (route.params?.entry) {
        const currentDate = getCurrentDate();
        try {
          const docRef = await addDoc(collection(db, "entries"), {
            date: currentDate,
            score: route.params.score,
            feel: route.params.feel,
            entry: route.params.entry,
          }, {merge: true});
          console.log("Document written with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      }
    }

    // Call the async function
    addEntry();
  }, [route.params?.entry]);

  return (
    <SafeAreaView style={styles.container}>
     
      
    </SafeAreaView>
  )
}

export default JournalCalendar

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})