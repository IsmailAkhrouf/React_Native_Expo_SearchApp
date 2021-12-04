import React from 'react';
import {StyleSheet,Text,View,Button,TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function RechercherLieu({navigation}) {

  const pressHandler2 = () => {
    navigation.navigate('Filtre');
  }
  const pressHandler3 = () => {
    navigation.navigate('Categories');
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>

      
      <TouchableOpacity style={styles.item} onPress={pressHandler2}>
        <Feather name="search" size={24} color="black" />
        <Text style={styles.itemText}>ville / categorie</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.item} onPress={pressHandler3}> 
        <Feather name="search" size={24} color="black" />
        <Text style={styles.itemText}>categories</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAF10C',
    padding:16,
  },
  item: {
    alignItems: 'center',
      justifyContent: 'center',
      marginTop:30,
      backgroundColor: '#DAF10C',
      flexDirection: 'row',
      borderColor: '#21CBD7',
      borderWidth:1,
      backgroundColor: '#21CBD7',
      height:60,
  },
  itemText: {
    alignItems: 'center',
      justifyContent: 'center',
      marginLeft:10,
      fontSize:20,
      fontWeight:'bold',
  },
  content: {
    padding:20,
      marginTop:170,
    
  },
});