import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import {AntDesign} from 'react-native-vector-icons';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Scale = ({route, navigation}) => {
  const email  = route.params?.email;

  const [sliderValue, setSliderValue] = useState(() => route.params?.anxietyScore? route.params.anxietyScore: 5);

  const handleAnxietyScore = () => {
    navigation.navigate({ name: 'Feel', params: { anxietyScore: sliderValue }, merge: true })
  }

  // console.log(sliderValue)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.close}>
        <TouchableOpacity style={{marginRight: screenWidth*0.05}}onPress={() => navigation.navigate('JournalCalendar', {email: email})}>
          <AntDesign name='close' size={35}></AntDesign>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Rate your overall anxiety score for today</Text>
      <View style={styles.scoreBg}>
        <Text style={styles.score}>{sliderValue}</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Slider style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
          minimumTrackTintColor="#01377D"
          maximumTrackTintColor="#000000"
          vertical="true"
          track
          // thumbTintColor="#000000"
          thumbImage={require('../assets/thumbimage.png')}
          transform={[{ rotate: '-90deg' }]}
        />
      </View>
      <Text style={styles.desc}>1 = No Anxiety, 10 = Extreme Anxiety</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleAnxietyScore()}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Scale;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: screenWidth*0.05,
  },
  close: {
    marginTop: screenHeight*0.05,
    width: screenWidth,
    alignItems: 'flex-end',
    marginBottom: screenHeight*0.03
  },
  title: {
    color: '#01377D',
    textAlign: 'center',
    fontSize: screenWidth*0.06,
    marginBottom: screenHeight*0.03,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    height: screenHeight*0.48,
    width: screenHeight*0.48,
    // height: screenHeight*0.3,
    // width: screenHeight*0.3,
    marginBottom: screenHeight*0.02
  },
  scoreBg: {
   backgroundColor: 'lightblue',
   borderRadius: 50,
   width: screenWidth*0.16,
   height: screenWidth*0.16,
   justifyContent: 'center',
   alignItems:'center',
   marginBottom: screenHeight*0.02,
  },
  score: {
    fontSize: screenWidth*0.07,
    color: "#01377D"
  },
  desc: {
    color: "#01377D",
    fontSize: screenWidth*0.035,
    marginBottom : screenHeight*0.02
  },
  button: {
    backgroundColor: '#01377D',
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