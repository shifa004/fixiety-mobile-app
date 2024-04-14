import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import {AntDesign} from 'react-native-vector-icons';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Scale = ({route, navigation}) => {
  const [sliderValue, setSliderValue] = useState(() => route.params?.anxietyScore? route.params.anxietyScore: 5);

  const handleAnxietyScore = () => {
    navigation.navigate({ name: 'Feel', params: { anxietyScore: sliderValue }, merge: true })
  }

  console.log(sliderValue)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.close}>
        <TouchableOpacity style={{marginRight: screenWidth*0.05}}onPress={() => navigation.navigate('Home')}>
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
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          track
          thumbTintColor="#000000"
          thumbImage={require('../assets/thumbimage.png')}
          transform={[{ rotate: '-90deg' }]} // Rotate the slider to vertical
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
    marginBottom: screenHeight*0.02
  },
  scoreBg: {
   backgroundColor: 'lightgrey',
   borderRadius: 50,
   width: screenWidth*0.16,
   height: screenWidth*0.16,
   justifyContent: 'center',
   alignItems:'center',
   marginBottom: screenHeight*0.02
  },
  score: {
    fontSize: screenWidth*0.07,
  },
  desc: {
    fontSize: screenWidth*0.035,
    marginBottom : screenHeight*0.02
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
  },
});