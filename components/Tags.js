import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Card, Button } from '@rneui/themed';
import { Avatar } from "@rneui/base";


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Tags = ({data, navigation }) => {
    // const [name, setName] = data

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('FormDetails')} style={styles.button}>
                    <Text style={{paddingLeft:10, paddingRight:10}}>{data}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Tags;

const styles = StyleSheet.create({
    container: {
        width:100
    },
    button: {
        backgroundColor: 'lightblue',
        // paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        // width: 'auto',
        alignItems: 'center'
    },
});