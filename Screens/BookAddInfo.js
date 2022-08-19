import React, { useEffect, useRef, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    TextInput,
    StyleSheet,
    ImageBackground
} from "react-native";
import { Camera } from 'expo-camera';
import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system'
import axios from "axios";

const BookAddInfo = ({ navigation, route }) => {
    const [title, onChangeTitle] = React.useState("");
    const [description, onChangeDescription] = React.useState("")

    function Submit () {
        navigation.navigate({name: "Live Translation", params: 
            {language: route.params?.language, title: title.replace(/\s+/g,'_'), description: description}
        })
    }

    return (
        <SafeAreaView>
            <Text style={[styles.question, styles.margin]}>What is the Title of the book?</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                value={title}
            />
            <Text style={[styles.question]}>What is the Description of the book?</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeDescription}
                value={description}
            />

            <View style={{flex: 1, alignItems: 'center',}}>
                <TouchableOpacity style={styles.Button} onPress={Submit}>
                    <Text style={{ textAlign: 'center' }}>Submit</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    margin: {
        marginTop: 10
    },
    question: {
        marginLeft: 10,
        fontSize: 18,
        width: '100%',
        textAlign: 'center'
    },
    Button: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#dbdbdb',
        borderColor: 'black',
        width: 100,
        height: 40,
        marginTop: 20,
    },
});

export default BookAddInfo;