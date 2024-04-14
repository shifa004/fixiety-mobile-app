import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, SafeAreaView, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, Button } from '@rneui/themed';
import { Avatar } from "@rneui/base";
import Tags from './Tags';
import ForumReplies from './ForumReplies';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const ForumDetails = ({ route, navigation }) => {
    const { x, i } = route.params
    console.log(x, i)
    const [data, setData] = useState(x)
    const [username, setUsername] = useState('Jane Doe')
    const [title, setTitle] = useState('Anxiety is very very bad')
    const [detail, setDetail] = useState('My question is bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla')
    const [replies, setReplies] = useState(24)
    const [comment, setComment] = useState()
    const [picture, setPicture] = useState(require('../assets/icon.png'))
    const [Likecount, setLikecount] = useState(50)
    return (
        // <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? "padding" : "height"} keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : -200}>
            <ScrollView>


                <Card width={"90%"} containerStyle={styles.card}>
                    <View style={styles.header}>
                        <Avatar size={screenWidth * 0.15} rounded source={picture} />
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ marginLeft: 20, fontWeight: 'bold' }}>{data.username}</Text>
                            <Text style={{ marginLeft: 20, color: 'grey' }}>{data.date}</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: screenWidth * 0.042, fontWeight: 'bold', marginBottom: screenWidth * 0.03 }}>{data.title}</Text>
                    <Text style={{ color: 'grey' }}>{data.detail}</Text>
                    <View style={{ flexDirection: 'row', marginTop: screenWidth * 0.03, flexWrap: 'wrap', }}>

                        
                        {data.tags.map((x, i) => (

                       
                            <View style={{ margin: 5 }}>
                            <Tags data={x} key={i}/>
                            </View>
                        ))}
                    </View>

                </Card>

                <Text style={{ fontWeight: 'bold', marginTop: screenWidth * 0.05, fontSize: screenWidth * 0.035, marginLeft: screenWidth * 0.04 }}>Replies ({data.replycount})</Text>

                {data.replies.map((x, i) => (

                    <ForumReplies data={x} key={i} />

                ))}
            </ScrollView>

            <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', marginTop: screenWidth * 0.03 }}>
                <TextInput placeholder='Comment..' value={comment} onChangeText={text => setComment(text)} style={styles.input} autoCorrect={false} autoCapitalize={'none'} />
                <TouchableOpacity onPress={() => navigation.navigate('FormDetails')}>
                    <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: screenWidth * 0.02 }}>Post</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>

    );
};

export default ForumDetails;

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
        marginBottom: 15
    },
    card: {
        borderRadius: 10,
    },
    innerContainer: {
        flex: 1,
    },
    button: {
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: 'black',
        width: screenWidth * 0.8,
        height: screenWidth * 0.1,
        padding: screenWidth * 0.02,
        marginHorizontal: screenWidth * 0.02
    },
    buttonText: {
        fontSize: 16,
    },
});