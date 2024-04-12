import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import TickMarks from './TickMarks';

const Scale = ({navigation}) => {
  const [sliderValue, setSliderValue] = useState(5);
  const ticks = Array.from({ length: 10 }, (_, i) => i); // Create an array of 11 items for tick marks

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate your anxiety score for today</Text>
      <View style={styles.sliderContainer}>
        <TickMarks ticks={ticks} sliderHeight={300} />
        <Slider
          style={[styles.slider, { height: 300 }]}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          thumbTintColor="#000000"
          transform={[{ rotate: '-90deg' }]} // Rotate the slider to vertical
        />
      </View>
      <Text style={styles.score}>{sliderValue}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Feel')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Scale;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    width: 300,
  },
  ticksContainer: {
    position: 'relative',
    height: 300,
    justifyContent: 'space-between',
  },
  tick: {
    position: 'absolute',
    left: 0,
    width: 10,
    height: 2,
    backgroundColor: 'black',
  },
  score: {
    fontSize: 24,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});