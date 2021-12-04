import React,{ useState, useEffect } from 'react';
import {Button, TextInput, View ,StyleSheet,Text, TouchableOpacity,Dimensions,Image } from 'react-native';
import MapView,{Marker,Callout} from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapLieu({navigation}) {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setlatitude] = useState(35.79999);
    const [longitude, setlongitude] = useState(-7.9999);
    const [coord,setcoord] = useState({latitude:35.78825,longitude:-7.4324})

    
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
      setcoord({latitude:navigation.getParam('Latitude'),longitude:navigation.getParam('Longtitude')});
      console.log(navigation.getParam('Latitude'));
      console.log(navigation.getParam('Longtitude'));
      console.log(navigation.getParam('Nom'));
      console.log(navigation.getParam('Adresse'));

    })();
    }, []);


    return (
        <View style={styles.container}>
          <MapView style={styles.mapView} showsUserLocation={true}
              region={{ latitude:latitude , longitude: longitude, latitudeDelta: 5.015, longitudeDelta: 2.0121
           }} 
          >
           <Marker 
              coordinate={coord}
              title={navigation.getParam('Nom')}
              description={navigation.getParam('Adresse')}
            > 
           <Image source={{uri:navigation.getParam('Image')}} style={styles.image} />
            <Callout tooltip>
             <View>
               <View style={styles.bubble}>
               <Text style={styles.Text}>{navigation.getParam('Nom')}</Text>
               <Text style={styles.Text}>{navigation.getParam('Adresse')}</Text>
             </View>
             <View style={styles.arrowBorder}/>
             <View style={styles.arrow}/>
           </View>
           </Callout>
            </Marker>
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
    bubble: {
      flexDirection: 'column',
      alignSelf: 'flex-start',
      backgroundColor: '#fff',
      borderRadius: 6,
      borderColor: '#ccc',
      borderWidth: 0.5,
      padding: 15,
      width: 150,
    },
    arrow:{
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: '#fff',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: 16,
    },
    arrowBorder:{
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: '#007a87',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -0.5,
    },
    Text:{
      fontSize: 16,
      marginBottom: 5,
    },
    image:{
      width: 120,
      height: 80,
    },
  });