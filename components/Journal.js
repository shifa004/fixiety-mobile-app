import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import TickMarks from './TickMarks';

const Journal = () => {
  const [sliderValue, setSliderValue] = useState(5);
  const ticks = Array.from({ length: 11 }, (_, i) => i); // Create an array of 11 items for tick marks

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate your anxiety score for today</Text>
      <View style={styles.sliderContainer}>
        {/* Render the tick marks */}
        <TickMarks ticks={ticks} sliderHeight={300} />
        {/* Rotate the slider to make it vertical */}
        <Slider
          style={[styles.slider, { height: 300 }]}
          minimumValue={0}
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
      <TouchableOpacity style={styles.button} onPress={() => console.log('Next pressed')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    width: 300, // Slider length
    // Add rotation transformation to make the slider vertical
  },
  ticksContainer: {
    position: 'relative',
    height: 300, // Match slider height
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

export default Journal;
