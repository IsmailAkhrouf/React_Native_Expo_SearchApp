import React,{ useState, useEffect } from 'react';
import {Button, TextInput, View, StyleSheet,Text, TouchableOpacity,StatusBar,Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function FlatListItem({item}){
   
    return (
        <View style={styles.contentItem}>
             <MaterialIcons name="place" size={24} color="black" style={styles.inputIcon1} />
            
             <Text style={styles.Text1}>{item.Nom}</Text>
             <Text style={styles.Text3}>|</Text>
             <Text style={styles.Text2}>{item.Adresse}</Text>
             
             <Entypo name="arrow-long-right" size={20} color="black"  style={styles.inputIcon2}/>
        </View>
    );

}

const styles = StyleSheet.create({
    contentItem: {
      borderColor: 'black',
      borderWidth: 2,
      borderStyle: 'solid',
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding:20,
      height : 65,
      width: 380,
    },
    Text1: {
      color:"black",
      fontSize : 12,
      right: 20,
      
      
    },
    Text2: {
      color:"black",
      fontSize : 12,
      right: 18,
      
    },
    Text3: {
      color:"black",
      fontSize : 12,
      right: 18,
      
    },
    inputIcon1: {
        right:20,
        bottom:2,
    },
    inputIcon2: {
        right:6,
        top:1,
    },
  });