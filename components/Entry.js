import { StyleSheet, SafeAreaView, TouchableOpacity, View, Text, Dimensions } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { MaterialCommunityIcons} from 'react-native-vector-icons';
import {AntDesign} from 'react-native-vector-icons';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Entry = ({route, navigation}) => {
    const ent = route.params.e
    console.log(ent)

    const formatDate = (dateString) => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      const [day, month, year] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
    
      const dayOfWeek = days[date.getDay()];
      const dateOfMonth = date.getDate();
      const monthName = months[date.getMonth()];
      const yearNumber = date.getFullYear();
    
      return `${dayOfWeek}, ${dateOfMonth} ${monthName} ${yearNumber}`;
    };

    const emojis = [
      { name: 'emoticon-happy-outline', label: 'Happy', color: "green" },
      { name: 'emoticon-neutral-outline', label: 'Neutral', color: "grey" },
      { name: 'emoticon-sad-outline', label: 'Sad', color: "red"},
    ];
  
    const findEmojiByLabel = (label) => {
      return emojis.find(emoji => emoji.label.toLowerCase() === label.toLowerCase());
    };

    const emo = findEmojiByLabel(ent.feel)

    return (
    <SafeAreaView style ={styles.container}>
      <View style={styles.close}>
      <TouchableOpacity style={{marginLeft: screenWidth*0.05}} onPress={() => navigation.navigate('JournalCalendar')}>
          <AntDesign name='arrowleft' size={35}></AntDesign>
        </TouchableOpacity>
        <Text>{formatDate(ent.date)}</Text>
        <TouchableOpacity style={{marginRight: screenWidth*0.05}} onPress={() => navigation.navigate('Home', {email: email, username: username})}>
          <AntDesign name='delete' size={35}></AntDesign>
        </TouchableOpacity>
      </View>
      <View style={{alignItems:'center'}}>
        <MaterialCommunityIcons name={emo.name}  color={emo.color} size={130}/> 
      </View>
      <View style={{alignItems:'center'}}>
        <Text>Your Journal Entry</Text>
        <Text>Anxiety Score on this Day: {ent.score}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{ent.entry}</Text>
      </View>
    </SafeAreaView>
  )
}

export default Entry

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
  },
  close: {
    marginTop: screenHeight*0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth,
    alignItems: 'center',
    marginBottom: screenHeight*0.03
  },
  inputContainer: {
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    padding: 20,
    margin: screenWidth*0.08,
    height:'50%'
  },
  inputText: {
    fontSize: 16,
  },
})