import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
   StyleSheet,
   Text,
   View,
   Image,
   } from 'react-native';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image
        style={{width:250,height:250}}
        source={require('./photos/logo.png' )}
      />
      <Text style={{fontSize:30,fontWeight:'bold'}}>SearchApp</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAF10C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
