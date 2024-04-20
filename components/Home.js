import { StyleSheet, SafeAreaView, TouchableOpacity, View, Text, Dimensions, Image, ScrollView } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { auth } from './config'; 

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Home = ({route , navigation}) => {
  
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        setCurrentUser(user);
      } else {
        // No user is signed in
        setCurrentUser(null);
      }
    });  return () => unsubscribe();
  }, []);

    return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      
      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('JournalCalendar',  {email: currentUser.email})}>
        <Text style={styles.heading}>Personal Anxiety Journal</Text>
        <Text style={styles.description}>Log your daily anxiety levels and activities to identify potential triggers.</Text>
        <Image source={require("../assets/journal.png")} style={{width:200, height:200}}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section} onPress={() => navigation.navigate('MyTabs', {email: currentUser.email})}>
        <Text style={styles.heading}>Community Forum</Text>
        <Text style={styles.description}>Join discussions with peers and share coping techniques.</Text>
        <Image source={require("../assets/community.png")} style={{width:200, height:200}}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.section}>
        <Text style={styles.heading}>Educational Content</Text>
        <Text style={styles.description}>Learn about anxiety and discover practical methods to handle it.</Text>
        <Image source={require("../assets/education.png")} style={{width:200, height:200}}/>
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
    backgroundColor: 'white',
  },
  section: {
    marginHorizontal: screenWidth*0.06,
    marginVertical: screenWidth*0.04,
    padding: screenHeight*0.025,
    backgroundColor: '#e8effa',
    borderRadius: 10,
  },
  heading: {
    fontSize: screenWidth*0.06,
    fontWeight: 'bold',
    marginBottom: screenHeight*0.02,
    color: '#3C3C3C',
  },
  description: {
    fontSize: screenWidth*0.04,
    color: '#3C3C3C',
  }
});