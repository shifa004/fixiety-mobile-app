import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Card, Button } from '@rneui/themed';
import { Avatar } from "@rneui/base";
import { AntDesign, Entypo } from 'react-native-vector-icons'
import {storage } from './config'
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker';
import { collection, doc, onSnapshot,setDoc } from "firebase/firestore";

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const CreateThread = ({ email, navigation }) => {
    const {username} = email
    console.log(email)
    const [title, setTitle] = useState()
    const [detail, setDetail] = useState()
    const [replies, setReplies] = useState()
    const [likeCount, setLikecount] = useState()
    const [picture, setPicture] = useState(require('../assets/icon.png'))
    const [tag, setTag] = useState()
    const [tags, setTags] = useState([])
    const [last, setLast] = useState()
    const [image, setImage] = useState()
    const [fileName, setFileName] = useState()
    const readID = async () => {
        const docs = await getDocs(collection(db, "threads"));
        const temp = []
        let lastID;
        docs.forEach((doc) => {
            lastID = doc.id;
        });
        setLast(lastID)
    }

    const set = async () => {
        readID()
        const docRef = doc(db, "threads", last + 1)
        await uploadImage();
        const currentDate = new Date();
        const timestamp = {
            ms: currentDate.getMilliseconds(),
            s: Math.floor(currentDate.getTime() / 1000)
        };
        await setDoc(docRef, { username: email, detail: detail, title: title, date: timestamp, tags: tags }, { merge: true })
            .then(() => {
                console.log('data submitted')
                setTitle('')
                setDetail('')
                setTags('')
            })
            .catch((error) => { console.log(error.message) })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            // console.log(image)
            setFileName(result.assets[0].uri.substring(result.assets[0].uri.toString().lastIndexOf('/') + 1))
        };
    }

    const uploadImage = async () => {
        const imgRef = ref(storage, fileName)
        const img = await fetch(image)
        const bytes = await img.blob()
        await uploadBytesResumable(imgRef, bytes).then(() => console.log('uploaded'))
    }

    function add() {
        const temp = [...tags]
        temp.push(tag)
        setTags([...temp])
        console.log(tags)
        setTag('')
    }

    function remove(index) {
        const temp = tags.filter((tag, i) => i !== index);
        setTags([...temp])
        console.log(tags)
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? "padding" : "height"} keyboardVerticalOffset={Platform.OS == 'ios' ? 150 : -200} >
            <ScrollView>

                <Text style={{ marginVertical: screenWidth * 0.06, marginLeft: screenWidth * 0.05, fontSize: screenWidth * 0.05, fontWeight: 'bold' }}>Create Thread</Text>
                <View>
                    <Text style={styles.fields}>Title</Text>
                    <TextInput value={title} onChangeText={text => setTitle(text)} style={styles.input} autoCorrect={false} autoCapitalize={'none'} />
                </View>
                <View style={[{ height: screenWidth * 0.6, marginTop: screenWidth * 0.1 }]}>
                    <Text style={styles.fields}>Content</Text>
                    <View style={{ position: 'relative' }}>


                        <TextInput value={detail} multiline={true} numberOfLines={4} onChangeText={text => setDetail(text)} style={[styles.input, { height: screenHeight * 0.2, textAlignVertical: 'top', padding: screenWidth * 0.03, paddingTop: screenWidth * 0.04 }]} autoCorrect={false} autoCapitalize={'none'} />
                        <TouchableOpacity onPress={pickImage} style={styles.touchableOpacity}>
                            <View style={{ flexDirection: 'row' }}>
                                <Entypo name='attachment' color='#01377D' size={15} style={{ marginRight: screenWidth * 0.01 }} />
                                <Text style={{ color: '#01377D' }}>Attach</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: screenWidth * 0.1 }}>
                    <Text style={styles.fields}>Tags</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <TextInput value={tag} onChangeText={text => setTag(text)} style={[styles.input, { width: screenWidth * 0.8 }]} autoCorrect={false} autoCapitalize={'none'} />
                        <AntDesign name='plus' color="#01377D" size={25} onPress={() => add()} style={{ marginTop: screenWidth * 0.03 }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: screenWidth * 0.03, marginLeft: screenWidth * 0.04 }}>
                    {tags.map((x, i) => (
                        <View style={styles.tag} key={i} >
                            <Text style={{ paddingLeft: 10, paddingRight: 10 }}>{x}</Text>
                            <AntDesign name='close' color='grey' size={13} style={{ marginRight: screenWidth * 0.02 }} onPress={() => remove(i)} />
                        </View>
                    ))}
                </View>
                <TouchableOpacity onPress={set} style={styles.end}>
                    <Text style={{ color: 'white', fontWeight: 'bold', }}>Create</Text>
                </TouchableOpacity>

            </ScrollView>

        </KeyboardAvoidingView>
    );
};

export default CreateThread;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: '#f2f5fa'
        //padding: 20,
    }, touchableOpacity: {
        position: 'absolute',
        bottom: screenWidth * 0.02,
        left: screenWidth * 0.07,
        zIndex: 1,
        backgroundColor: 'transparent',
    },
    end: {
        marginLeft: screenWidth * 0.04,
        height: screenWidth * 0.08,
        backgroundColor: '#01377D',

        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth * 0.3,
        marginTop: screenWidth * 0.03
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        //alignItems:'center',

    },
    fields: {
        marginLeft: screenWidth * 0.05,
        fontWeight: 'bold'
    },
    card: {
        borderRadius: 10,
    }, input: {
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: 'black',
        width: screenWidth * 0.9,
        height: screenWidth * 0.1,
        padding: screenWidth * 0.02,
        marginHorizontal: screenWidth * 0.04,
        marginTop: screenWidth * 0.04

    },
    button: {
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    tag: {
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        // paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        // width: 'auto',
        margin: 5,
        alignItems: 'center'
    },

    buttonText: {
        fontSize: 16,
    },
});