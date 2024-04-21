import React, { useState , useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView,ScrollView , TextInput} from 'react-native';
import { Card, Button } from '@rneui/themed';
import { Avatar } from "@rneui/base";
import {ref, uploadBytesResumable} from 'firebase/storage'
import {doc, setDoc,getDocs, collection} from "firebase/firestore";
import {storage, db} from './config'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Forum = ({ route, navigation }) => {
    const email = route.params?.email;
    const user = route.params?.username;
    // useEffect(()=>{
    //     readAll()
    //     return ()=>{}
    // }
    //   ,) 
      useEffect(()=>{
        readAll()
        return ()=>{}
    }
      ,) 
    const [username, setUsername] = useState('John')
    const [title, setTitle] = useState('Anxiety')
    const [detail, setDetail] = useState('My question is bla bla')
    const [replies, setReplies] = useState(24)
    const [picture, setPicture] = useState(require('../assets/icon.png'))
    const [threads, setThreads] = useState([])
    const [filename,setFilename] = useState()

    const readAll = async () => {
        const docs = await getDocs(collection(db, "threads"));
        const temp = []
        docs.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data().date);
        const milliseconds = doc.data().date.seconds * 1000 + Math.floor(doc.data().date.nanoseconds / 1000000);
        const date = new Date(milliseconds);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const count = doc.data().replies ? doc.data().replies.length : 0;
        temp.push({ id: doc.id, username: doc.data().username, title: doc.data().title , date:formattedDate, replycount:count, replies:doc.data().replies, detail:doc.data().detail, tags:doc.data().tags, filename:doc.data().filename});
        });
        setThreads([...temp]);
        //console.log(threads)
    }
    const [search, setSearch] = useState('')
    const searchThread = threads.filter(thread =>
        thread.title.toLowerCase().includes(search.toLowerCase()) ||
        thread.username.toLowerCase().includes(search.toLowerCase())
        // console.log(thread.title.toLowerCase().includes('i'))
    );
    return (
        <SafeAreaView style={styles.container}>   
        <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    onChangeText={text => setSearch(text)}
                    value={search}
                />
            </View> 
        <ScrollView>

        {searchThread.map((x, i) => (
            <TouchableOpacity key={i} onPress={() => navigation.navigate('ForumDetails',{x, i, email})}>
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
        backgroundColor: '#f2f5fa'
        //padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        //alignItems:'center',

    },input: {
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: 'black',
        borderBottomWidth:2,
        borderBottomColor: '#01377D',
        width: screenWidth * 0.9,
        height: screenWidth * 0.1,
        padding: screenWidth * 0.02,
        marginHorizontal: screenWidth * 0.04,
        marginTop: screenWidth * 0.04,
        marginBottom: screenWidth * 0.03
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
