import React from 'react';
import {StyleSheet,Text,View,Button,TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


export default function Categories({navigation}) {

  const pressHandler4 = () => {
    navigation.navigate('PharmaciesMapLieus');
  }

  const pressHandler5 = () => {
    navigation.navigate('BanquesMapLieus');
  }

  const pressHandler6 = () => {
    navigation.navigate('RestaurantsMapLieus');
  }

  const pressHandler7 = () => {
    navigation.navigate('BoutiquesMapLieus');
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>

     
      <TouchableOpacity style={styles.item} onPress={pressHandler4}>
      <MaterialIcons name="local-pharmacy" size={24} color="black" />
        <Text style={styles.itemText}>Pharmacies</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.item} onPress={pressHandler5}> 
      <MaterialCommunityIcons name="bank" size={24} color="black" />
        <Text style={styles.itemText}>Banques</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={pressHandler6}> 
      <MaterialIcons name="restaurant" size={24} color="black" />
        <Text style={styles.itemText}>Restaurants</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={pressHandler7}> 
      <FontAwesome name="shopping-bag" size={24} color="black" />
        <Text style={styles.itemText}>Boutiques</Text>
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
    marginTop:80,
    
  },
});