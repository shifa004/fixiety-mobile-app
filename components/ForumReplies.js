import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Card, Button } from '@rneui/themed';
import { Avatar } from "@rneui/base";
import { Feather, AntDesign } from 'react-native-vector-icons'
import { doc, setDoc, getDocs, getDoc, collection, Timestamp, query, where, updateDoc } from "firebase/firestore";
import { storage, db } from './config'
import { set } from 'firebase/database';
import { keyboardProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const ForumReplies = ({ data, navigation, index, dID, email }) => {
    useEffect(() => {
        readLikes()
    },)
    const { name, reply, likes, date, id } = data
    const [like, setLike] = useState()
    const milliseconds = date.seconds * 1000 + Math.floor(date.nanoseconds / 1000000);
    const mdate = new Date(milliseconds);
    const formattedDate = `${mdate.getMonth() + 1}/${mdate.getDate()}/${mdate.getFullYear()}`;
    const [username, setUsername] = useState('Miley cyprus john')
    const [title, setTitle] = useState('Anxiety')
    //const [detail, setDetail] = useState('My question is bla bla')
    const [replies, setReplies] = useState(24)
    const [likeCount, setLikecount] = useState(10)
    const [t, setT] = useState(false)
    const [f, setF] = useState(false)
    const [liked, setLiked] = useState()
    const [number, setNumber] = useState(0)
    const [picture, setPicture] = useState(require('../assets/icon.png'))
    const [check, setCheck] = useState(true)
    // useEffect(()=> setCheck(false),)
    const updatelikes = async () => {
        try {
            const thread = doc(db, 'threads', dID);
            const docSnap = await getDoc(thread);
            if (docSnap.exists()) {
                const threadData = docSnap.data();
                const replies = threadData.replies;
                let x = likes
                setLiked(false)
                const emailExists = replies[index].likes.some(like => like === email);
                if (!emailExists) {
                    replies[index].likes.push(email);
                    setLiked(true)
                    x = x + 1
                } else {
                    alert("You have already liked.")
                }
                await updateDoc(thread, {
                    replies: replies
                })

                //setLike(x)

            }
        } catch (error) {
            console.error(error);
        }
    };

    const readLikes = async () => {
        try {
            const thread = doc(db, 'threads', dID);
            const docSnap = await getDoc(thread);

            const threadData = docSnap.data();
            const likes = threadData.replies[index].likes;
            let totalCount = 0;
            likes.forEach(like => {
                totalCount += 1;
            });
            setLike(totalCount)
            console.log(totalCount)


        } catch (error) {
            console.log(error)
        }
    }
    const dislike = async () => {
        try {
            const thread = doc(db, 'threads', dID);
            const docSnap = await getDoc(thread);
            if (docSnap.exists()) {
                const threadData = docSnap.data();
                const replies = threadData.replies;
                console.log(replies)
                console.log(replies[index])
                replies[index].likes = (replies[index].likes) - 1;
                await updateDoc(thread, {
                    replies: replies
                })
                const x = parseInt(like) - 1
                console.log(x)
                setLike(x)
                setLiked(false)
                setT(false)
                setF(true)
                console.log(like)

            }
        } catch (error) {
            console.error(error);
        }
    };

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
                    <View style={{ marginTop: 18, color: 'grey', }}>
                        <Text> {reply}</Text>
                    </View>
                    <View style={{ marginTop: screenWidth * 0.03, flexDirection: 'row', alignItems: 'center', }}>
                        <AntDesign name='like2' size={20} onPress={() => updatelikes()} />
                        {/* {f || !t? <AntDesign name='like1' size={20} onPress={() => dislike()} /> : null} */}
                        <Text style={{ color: 'grey', marginLeft: screenWidth * 0.02, marginTop: screenWidth * 0.01 }}>{like}</Text>
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