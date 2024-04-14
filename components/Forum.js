import React, { useState , useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView,ScrollView } from 'react-native';
import { Card, Button } from '@rneui/themed';
import { Avatar } from "@rneui/base";
import {ref, uploadBytesResumable} from 'firebase/storage'
import {doc, setDoc,getDocs, collection} from "firebase/firestore";
import {storage, db} from './config'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Forum = ({ email, navigation }) => {

    useEffect(()=>{
        readAll()
        return ()=>{}
    }
      ,[]) 

    const [username, setUsername] = useState('John')
    const [title, setTitle] = useState('Anxiety')
    const [detail, setDetail] = useState('My question is bla bla')
    const [replies, setReplies] = useState(24)
    const [picture, setPicture] = useState(require('../assets/icon.png'))
    const [threads, setThreads] = useState([])

    const readAll = async () => {
        const docs = await getDocs(collection(db, "threads"));
        const temp = []
        docs.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().date);
        const milliseconds = doc.data().date.seconds * 1000 + Math.floor(doc.data().date.nanoseconds / 1000000);
        const date = new Date(milliseconds);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const count = doc.data().replies ? doc.data().replies.length : 0;
        temp.push({ id: doc.id, username: doc.data().username, title: doc.data().title , date:formattedDate, replycount:count, replies:doc.data().replies, detail:doc.data().detail, tags:doc.data().tags});
        });
        setThreads([...temp]);
        console.log(threads)
    }
    return (
        <SafeAreaView style={styles.container}>    
        <ScrollView>

        {threads.map((x, i) => (
            <TouchableOpacity onPress={() => navigation.navigate('ForumDetails',{x, i})}>
                <Card width={"90%"} containerStyle={styles.card}>
                    <View style={styles.header}>
                        <Avatar size={screenWidth * 0.20} rounded source={picture} />
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ marginLeft: 20, fontWeight: 'bold' }}>{x.title}</Text>
                            <Text style={{ marginLeft: 20, color: 'grey' }}>{x.username}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 18, justifyContent: 'space-between', width:screenWidth* 0.6 }}>
                                <Text style={{ marginLeft: 20, color: 'black', fontWeight: '400' }}>{x.replycount} Replies</Text>
                                <Text style={{color:'grey'}}>{x.date}</Text>
                            </View>

                        </View>

                    </View>
                </Card>
            </TouchableOpacity>
            ))}
            </ScrollView>
            </SafeAreaView>   
    );
};

export default Forum;

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
    create:{
        backgroundColor: 'lightblue',
        // paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        // width: 'auto',
        alignItems: 'center',
        width:80,
        marginTop:screenWidth*0.03,
        marginRight:screenWidth*0.07
    },
    bar:{
        flexDirection:'row',
        justifyContent:'flex-end',
        width:screenWidth
    }
    ,
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