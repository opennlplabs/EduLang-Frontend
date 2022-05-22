import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ScrollBar = (props) => {
    
        return (
            <View style={{ height: 200, width: 100, marginLeft: 20, borderWidth: 0.5, borderColor: '#ddddd' }}>
                <View style={{ flex: 2 }}>
                    {/* <TouchableOpacity onPress={() => console.log("Book Pressed")}> */}
                    <View>
                    <Image source={props.imageUri} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                    </View>
                    {/* </TouchableOpacity> */}
                    
                    
                </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text style={{ color: "black" }}>{props.name}</Text>
                </View>

            </View>
        );
    
}

export {ScrollBar}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})