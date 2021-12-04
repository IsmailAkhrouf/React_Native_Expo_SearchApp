import React,{ useState, useEffect } from 'react';
import {Button, TextInput, View, StyleSheet,Text, TouchableOpacity,Dimensions,Image } from 'react-native';
import ApiKeys from '../firebaseconfig/ApiKeys';
import * as firebase from 'firebase';
import MapView,{Marker,Callout} from 'react-native-maps';
import * as Location from 'expo-location';

export default function PharmaciesMapLieus() {

    // Initialize Firebase
    if(firebase.apps.length == 0){
      firebase.initializeApp(ApiKeys.firebaseConfig); 
     }
     const db = firebase.firestore();
     const db1 = firebase.storage();
     const [lieu,setlieu] = useState([]);

     var items = [];

     const renderData = (doc,url) => {
      items.push({ id : doc.id,
                          Adresse : doc.data().adresse , 
                          Categorie : doc.data().categorie,
                          Latitude : doc.data().latitude,
                          Longtitude : doc.data().longtitude,
                          Timestamp : doc.data().timestamp,
                          Nom : doc.data().nom , 
                          Ville : doc.data().ville ,
                          Image : url});
      
     }
     console.log(lieu);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setlatitude] = useState(35.79999);
  const [longitude, setlongitude] = useState(-7.9999);
  const [coord,setcoord] = useState({latitude:35.78825,longitude:-7.4324})

  const position = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setlatitude(location.coords.latitude);
    setlongitude(location.coords.longitude);
    setLocation(location);
    
  }

  const selectPlace = () => {
    const Lieu = db.collection('users');
    Lieu.where('categorie','==','pharmacies').get()
    .then((snapshot) => {
        snapshot.docs.forEach(doc =>{
              db1.ref().child('users/'+doc.id)
                  .getDownloadURL().then((url)=>{
                      renderData(doc,url);
                  });
        })
        items=[];
    });
    position();
   }

   useEffect(() => {

    selectPlace();
    setTimeout(() => setlieu(items), 2000);
    lieu.map(marker =>{console.log(marker.id)})
   }, []);

   mapMarkers = () => {
    return lieu.map((marker) => <Marker
      key={marker.id}
      coordinate={{
        latitude:marker.Latitude, 
        longitude:marker.Longtitude,
      }}
      title={marker.Nom}
      description={marker.Adresse}
    >
      <Image source={{uri:marker.Image}} style={styles.image}/>
      <Callout tooltip>
       <View>
       <View style={styles.bubble}>
         <Text style={styles.Text}>{marker.Nom}</Text>
         <Text style={styles.Text}>{marker.Adresse}</Text>
       </View>
       <View style={styles.arrowBorder}/>
       <View style={styles.arrow}/>
      </View>
      </Callout>
    </Marker >)
  }


    return (
      <View style={styles.container}>
      <MapView style={styles.mapView} showsUserLocation={true}
          region={{ latitude:latitude , longitude: longitude, latitudeDelta: 5.015, longitudeDelta: 2.0121
       }} 
      >
      {mapMarkers()}

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