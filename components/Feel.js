import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';

const Feel = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojis = [
    { name: 'emoticon-happy-outline', label: 'Happy' },
    { name: 'emoticon-neutral-outline', label: 'Neutral' },
    { name: 'emoticon-sad-outline', label: 'Sad' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How did you feel in general today?</Text>
      {emojis.map((e) => (
        <TouchableOpacity style={styles.emojiButton} onPress={() => setSelectedEmoji(e.label)}>
          <MaterialCommunityIcons name={e.name} size={36} color={selectedEmoji === e.label ? 'pink' : 'black'}/>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Feel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  emojiButton: {
    paddingVertical: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});