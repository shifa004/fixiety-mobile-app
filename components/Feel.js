import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons} from 'react-native-vector-icons';
import {AntDesign} from 'react-native-vector-icons';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Feel = ({route, navigation}) => {
  useEffect( () => {
    console.log(anxietyScore)
  }, [])

  const getCurrentDate=()=>{
 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: d-m-y;
  }

  const email  = route.params?.email;

  const [selectedEmoji, setSelectedEmoji] = useState(() => route.params?.feel? route.params.feel: "");
  const anxietyScore = route.params.anxietyScore

  const emojis = [
    { name: 'emoticon-happy-outline', label: 'Happy', color: "green" },
    { name: 'emoticon-neutral-outline', label: 'Neutral', color: "grey" },
    { name: 'emoticon-sad-outline', label: 'Sad', color: "red"},
  ];

  const [disabled,setDisabled]=useState(true)

  console.log(selectedEmoji)
  const handleFeel = () => {
    navigation.navigate({ name: 'Journal', params: { anxietyScore: anxietyScore, feel: selectedEmoji }, merge: true })
  }

  const chooseEmoji = (e) => {
    setDisabled(false)
    setSelectedEmoji(e.label)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.close}>
      <TouchableOpacity style={{marginLeft: screenWidth*0.05}} onPress={() => navigation.navigate({ name: 'Scale', params: { anxietyScore: anxietyScore }, merge: true })}>
          <AntDesign name='arrowleft' size={35}></AntDesign>
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: screenWidth*0.05}} onPress={() => navigation.navigate('Home', {email: email})}>
          <AntDesign name='close' size={35}></AntDesign>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>How did you feel in general today?</Text>
      {emojis.map((e, i) => (
        <TouchableOpacity key={i} style={styles.emojiButton} onPress={() => chooseEmoji(e)}>
          <MaterialCommunityIcons name={e.name} size={125} color={selectedEmoji === e.label ? e.color : 'black'}/>
        </TouchableOpacity>
      ))}
       <TouchableOpacity style={[styles.button, {backgroundColor: disabled? 'white': 'lightgrey'}]} disabled={disabled} onPress={() => handleFeel()}>
        <Text style={[styles.buttonText, {color: disabled? 'darkgrey': 'black'} ]}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Feel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: screenWidth*0.05,
    // backgroundColor: 'pink'
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
    textAlign: 'center',
    fontSize: screenWidth*0.06,
    marginBottom: screenHeight*0.03,
  },
  emojiButton: {
    marginBottom: screenHeight*0.055,
  },
  button: {
    backgroundColor: '#E0E0E0',
    width: screenWidth*0.25,
    height: screenHeight*0.07,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: screenWidth*0.056
  }
});