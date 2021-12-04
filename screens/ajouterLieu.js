import React,{ useState, useEffect }  from 'react';
import { Button, TextInput, View, StyleSheet,Text, TouchableOpacity,Image,Modal,Dimensions,LogBox,ScrollView } from 'react-native';
import { Formik } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import ApiKeys from '../firebaseconfig/ApiKeys';
import * as firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import Userpermissions from '../shared/Userpermissions';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
LogBox.ignoreLogs(['Setting a timer']);


    


export default function AjouterLieu() {

  

  // Initialize Firebase
  if(firebase.apps.length == 0){
    firebase.initializeApp(ApiKeys.firebaseConfig); 
  }
  const db = firebase.firestore();
  const db1 = firebase.storage();
  
    

    
    const [img, setImg] = useState(null);
    const [modalMapOpen,setmodalMapOpen] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [coord,setcoord] = useState({latitude:37.78825,longitude:-122.4324})
    const [latitude, setlatitude] = useState(37.780000);
    const [longitude, setlongitude] = useState(-122.40024);
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

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setImg(result.uri);
      }
    };

    const uploadImage = async (uri,id) => {
      const path = 'users/'+id;
      
        const response = await fetch(uri);
        const file = await response.blob();
        let upload = db1.ref(path).put(file);
        

      
   }
    
   const storeData = async (img,Nom,Ville,Categorie,Adresse,Atitude,Longitude) => {
    
      
      db.collection('users').add({
        nom : Nom,
        ville: Ville,
        categorie: Categorie,
        adresse: Adresse,
        timestamp:Date.now(),
        latitude:Atitude,
        longtitude:Longitude
      },{merge:true})
      .then(ref=>{
        uploadImage(img,ref.id);
      })
      
  
  }
  const geO = (values,coord) => {
    setcoord(coord);
    values.latitude = coord.latitude;
    values.longitude = coord.longitude;
  }
    return (
        
          
          <Formik
                initialValues={{nom:'',ville:'',categorie:'',adresse:''}}
                onSubmit={(values) => {
                  storeData(img,values.nom,values.ville,values.categorie,values.adresse,coord.latitude,coord.longitude)
                }}
          >
          {(props) => (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center',}}>
             <View style={styles.form}>
               <Modal visible={modalMapOpen} animationType='slide'>
               <View style={styles.modalContent}>
                <Ionicons name="close" size={34} color="black" onPress={() => setmodalMapOpen(false)}/>
                <MapView style={styles.mapView} showsUserLocation={true}
                  region={{ latitude:latitude , longitude: longitude, latitudeDelta: 5.015, longitudeDelta: 2.0121
                }} onPress={ (event) => geO(props.values,event.nativeEvent.coordinate)} 
                >
                <MapView.Marker coordinate={coord}/>
                </MapView>
                </View>
               </Modal>
                <View style={styles.inputView} >
                <MaterialCommunityIcons name="store" size={24} color="black" style={styles.inputIcon} />
                 <TextInput 
                 multiline 
                 style={styles.inputText}
                 placeholder="Nom..." 
                 placeholderTextColor="#707070"
                 onChangeText={props.handleChange('nom')}/>
               </View>
               <View style={styles.inputView} >
               <MaterialIcons name="place" size={24} color="black" style={styles.inputIcon} />
                <TextInput  
                 multiline
                 style={styles.inputText}
                 placeholder="Ville..." 
                 placeholderTextColor="#707070"
                 onChangeText={props.handleChange('ville')}/>
               </View>
               <View style={styles.inputView} >
               <MaterialCommunityIcons name="collage" size={24} color="black" style={styles.inputIcon} />
                <TextInput  
                 multiline
                 style={styles.inputText}
                 placeholder="Categorie..." 
                 placeholderTextColor="#707070"
                 onChangeText={props.handleChange('categorie')}/>
               </View>
               <View style={styles.inputView} >
               <Foundation name="target-two" size={24} color="black" style={styles.inputIcon} />
                <TextInput  
                 multiline
                 style={styles.inputText}
                 placeholder="Adresse..." 
                 placeholderTextColor="#707070"
                 onChangeText={props.handleChange('adresse')}/>
               </View>
               <View style={styles.buttonView} >
               <TouchableOpacity style={styles.Btn1} onPress={pickImage}>
                  <MaterialCommunityIcons name="camera-plus" size={24} color="black" style={styles.inputIconButton}/>
                  <Text style={styles.Text}>Ajouter photo</Text>
               </TouchableOpacity>
               </View>
               <View style={styles.buttonView} >
               <TouchableOpacity style={styles.Btn1} onPress={() => setmodalMapOpen(true)}>
               <MaterialIcons name="place" size={24} color="red" style={styles.inputIconButton} />
                  <Text style={styles.Text}>ajouter position sur la carte</Text>
               </TouchableOpacity>
               </View>
               <View style={styles.buttonView} >
               <TouchableOpacity style={styles.Btn} onPress={props.handleSubmit}>
                        <Text style={styles.Text}>envoyer</Text>
               </TouchableOpacity>
               </View>
             </View>
             </ScrollView>
          )}
          </Formik>
       
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DAF10C',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      flex:1,
      justifyContent: 'center',
      padding : 40,
      backgroundColor: '#DAF10C',
    },
    Btn:{
      backgroundColor:"#0DF3EC",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10,
    },
    Btn1:{
      backgroundColor:"#0DF3EC",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginBottom:30,
      flexDirection: 'row',
    },
    Text:{
      color:"black",
      fontSize : 20,
    },
    inputView:{
      backgroundColor: '#fff',
      borderColor:"#465881",
      borderRadius:45,
      borderWidth : 2,
      marginBottom:20,
      justifyContent:"center",
      padding:20,
      height : 65,
    },
    inputText:{
      fontSize : 17,
      left: 20,
      color:"black"
    },
    buttonView:{
      marginBottom:10,
      justifyContent:"center",
      
    },
    inputIcon:{
      position:"absolute",
      top:16,
      left:10,
    },
    inputIconButton:{
      right:15,
    },
    modalContent:{
      backgroundColor: '#fff',
    },
    mapView:{
      backgroundColor: '#fff',
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
    },
  });