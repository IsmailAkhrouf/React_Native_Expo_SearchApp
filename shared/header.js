import React from 'react';
import {StyleSheet,Text,View} from 'react-native';


export default function Header({title}) {
    return (
        <View style={styles.header}>
           <View>
             <Text style={styles.headerText}>{title}</Text>
           </View>
        </View>
    );
 }
  
  const styles = StyleSheet.create({
    header: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
        fontWeight:'bold',
        fontSize: 18,
        color: 'black',
        letterSpacing: 1,
      },
  });