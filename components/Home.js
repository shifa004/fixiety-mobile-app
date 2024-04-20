import { StyleSheet, SafeAreaView, TouchableOpacity, View, Text, Dimensions, Image, ScrollView } from 'react-native'
import React from 'react'
import { useEffect } from 'react';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Home = ({route , navigation}) => {
    const email = route.params?.email;
    const username = route.params?.username;
    console.log("in home", email, username)
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('JournalCalendar',  {email: email, username: username})}>
        <Text style={styles.heading}>Personal Anxiety Journal</Text>
        <Text style={styles.description}>Log your daily anxiety levels and activities to identify potential triggers.</Text>
        <Image source={require("../assets/journal.png")} style={{width:200, height:200}}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('MyTabs', {email: email})}>
        <Text style={styles.heading}>Community Forum</Text>
        <Text style={styles.description}>Join discussions with peers and share coping techniques.</Text>
        <Image source={require("../assets/community.png")} style={{width:200, height:200}}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <Text style={styles.heading}>Educational Content</Text>
        <Text style={styles.description}>Learn about anxiety and discover practical methods to handle it.</Text>
        {/* Icon for the educational content could be added here */}
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF', // AliceBlue color as an example for a calming background
  },
  section: {
    margin: 20,
    padding: 20,
    backgroundColor: '#E6E6FA', // Lavender color for a soothing effect on each section
    borderRadius: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3C3C3C', // Dark grey for text to ensure readability
  },
  description: {
    fontSize: 16,
    color: '#3C3C3C',
  },
  button: {
    backgroundColor: '#7FFFD4', // Aquamarine for a welcoming button color
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});