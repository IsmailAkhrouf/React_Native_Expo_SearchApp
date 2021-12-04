import React,{ useState, useEffect } from 'react';
import {Button, TextInput, View, StyleSheet,Text, TouchableOpacity,Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Userpermissions from '../shared/Userpermissions';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';



export default function Filtre({navigation}) {

  const pressHandler = () => {
    navigation.navigate('ListLieu');
  }

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setlatitude] = useState(35.79999);
    const [longitude, setlongitude] = useState(-7.9999);

    useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setlatitude(location.coords.latitude);
      setlongitude(location.coords.longitude);
      setLocation(location);
    })();
    }, []);

    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.Btn1} onPress={pressHandler}>
           <Feather name="search" size={24} color="black" style={styles.inputIconButton}/>
           <Text style={styles.Text}>Rechercher</Text>
          </TouchableOpacity>
          <MapView style={styles.mapView} showsUserLocation={true}
              region={{ latitude:latitude , longitude: longitude, latitudeDelta: 5.015, longitudeDelta: 2.0121
           }} 
          >
            
          </MapView>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#DAF10C',
    },
    mapView:{
      backgroundColor: '#fff',
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
    },
    Btn1:{
      backgroundColor:"#fff",
      height:50,
      alignItems:"center",
      justifyContent:"center",
      flexDirection: 'row',
    },
    Text:{
      color:"black",
      fontSize : 20,
      right:120,
    },
    inputIconButton:{
      right:130,
    },
  });