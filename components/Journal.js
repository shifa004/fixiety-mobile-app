import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, SafeAreaView, Dimensions, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import {AntDesign} from 'react-native-vector-icons';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Journal = ({ route, navigation }) => {
  const [entry, setEntry] = useState('');

  const [disabled,setDisabled]=useState(true)

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

  const handleJournal = () => {
    navigation.navigate('JournalCalendar')
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? "padding" : "height"}>     
        <View style={styles.close}>
        <TouchableOpacity style={{marginLeft: screenWidth*0.05}} onPress={() => navigation.navigate({ name: 'Scale', params: { notes: entry }, merge: true })}>
            <AntDesign name='arrowleft' size={35}></AntDesign>
        </TouchableOpacity>
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
        <TouchableOpacity style={[styles.button, {backgroundColor: disabled? 'white': 'lightgrey'}]} disabled={disabled} onPress={() => handleJournal()}>
          <Text style={[styles.buttonText, {color: disabled? 'darkgrey': 'black'} ]}>Next</Text>
        </TouchableOpacity>    
      </KeyboardAvoidingView>
  );
};

export default Journal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    padding: screenWidth*0.05,
    // justifyContent: 'center',
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
    borderColor: 'gray',
    backgroundColor: 'white',
    padding: screenWidth*0.05,
    height: '100%',
    width: screenWidth*0.8,
    textAlignVertical: 'top',
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