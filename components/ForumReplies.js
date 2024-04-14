import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView,ScrollView } from 'react-native';
import { Card, Button } from '@rneui/themed';
import { Avatar } from "@rneui/base";
import {Feather} from 'react-native-vector-icons'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const ForumReplies = ({ data, navigation }) => {
    const {name, likes, reply, date, key} = data
    const milliseconds = date.seconds * 1000 + Math.floor(date.nanoseconds / 1000000);
    const mdate = new Date(milliseconds);
    const formattedDate = `${mdate.getMonth() + 1}/${mdate.getDate()}/${mdate.getFullYear()}`;
    const [username, setUsername] = useState('Miley cyprus john')
    const [title, setTitle] = useState('Anxiety')
    //const [detail, setDetail] = useState('My question is bla bla')
    const [replies, setReplies] = useState(24)
    const [likeCount, setLikecount] = useState(10)
    const [picture, setPicture] = useState(require('../assets/icon.png'))
    return (
        <SafeAreaView style={styles.container}>    
        <ScrollView>
       
         
                <Card width={"90%"} containerStyle={styles.card}>
                    <View style={styles.header}>
                        <Avatar size={screenWidth * 0.13} rounded source={picture} />
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ marginLeft: 20, fontWeight: 'bold' }}>{name}</Text>
                            <Text style={{ marginLeft: 20, color: 'grey' }}>{formattedDate}</Text>
                        </View>
                        
                    </View>
                    <View style={{ marginTop: 18 , color:'grey',}}>
                                <Text> {reply}</Text>
                    </View>
                    <View style={{marginTop:screenWidth*0.03, flexDirection:'row', alignItems:'center',}}>
                    <Feather name='thumbs-up' size={20} onPress={()=>navigation.goBack()}/> 
                    <Text style={{color:'grey', marginLeft:screenWidth*0.02, marginTop: screenWidth*0.01}}>{likes}</Text>
                    </View>

                </Card>
  
            </ScrollView>

            </SafeAreaView>   
    );
};

export default ForumReplies;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',

        //padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        //alignItems:'center',

    },
    card: {
        borderRadius: 10,
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