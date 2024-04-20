import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SectionList, SafeAreaView, Dimensions } from 'react-native';
import {AntDesign,Entypo, FontAwesome, MaterialIcons} from 'react-native-vector-icons';
import UserProfile from './components/UserProfile';
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const settings = [
    {
      title: 'Account',
      data: [
        { name: 'Edit profile', icon: 'user', iconType: AntDesign, component: "UserProfile" },
      ],
    },
    {
      title: 'Actions',
      data: [
        { name: 'Log out', icon: 'logout', iconType: AntDesign, component: 'WelcomePage'},
      ],
    },
  ];

const Settings = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={settings}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => {navigation.navigate(item.component)}}>
          <item.iconType name={item.icon} size={24} style={styles.icon} />
          <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
      )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: screenWidth*0.045,
    color: 'black',
    marginTop: screenHeight*0.02,
    marginBottom: screenHeight*0.01,
    marginLeft: screenHeight*0.03,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: screenHeight*0.015,
    paddingLeft: screenHeight*0.03,
  },
  icon: {
    marginRight: screenHeight*0.015,
    color: 'gray',
  },
  itemText: {
    fontSize: screenWidth*0.04,
    color: 'black',
  },
  separator: {
    height: 1,
    width: screenWidth*0.9,
    backgroundColor: '#e0e0e0',
    marginLeft: screenWidth*0.045,
  },
});
