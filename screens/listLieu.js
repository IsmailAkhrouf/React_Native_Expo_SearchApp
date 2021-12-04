import React,{ useState, useEffect } from 'react';
import {Button, TextInput, View, StyleSheet,Text, TouchableOpacity,StatusBar,FlatList,Demensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ApiKeys from '../firebaseconfig/ApiKeys';
import * as firebase from 'firebase';
import FlatListItem from '../shared/FlatListItem ';

  
export default function ListLieu({navigation}) {

    // Initialize Firebase
   if(firebase.apps.length == 0){
    firebase.initializeApp(ApiKeys.firebaseConfig); 
   }
   const db = firebase.firestore();
   const db1 = firebase.storage();
  
   const [categorie,setcategorie] = useState(null);
   const [ville,setville] = useState(null);
   const [lieu,setlieu] = useState([]);
   const [isRender,setisRender] = useState(false);

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
    setlieu(items);
   }
   const selectPlace = () => {
    var Lieu = db.collection('users');
    if(!ville && categorie){
        Lieu = Lieu.where('categorie','==',categorie);
    }else if (ville && !categorie){
        Lieu = Lieu.where('ville','==',ville);
    }else if(ville && categorie){
        Lieu = Lieu.where('ville','==',ville).where('categorie','==',categorie);
    }
    Lieu.get()
          .then((snapshot) => {
              snapshot.docs.forEach(doc =>{
                    db1.ref().child('users/'+doc.id)
                        .getDownloadURL().then((url)=>{
                            renderData(doc,url);
                        });
              })
              items=[];
          });
    setisRender(!isRender);
    } 



    return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor='#40404c'/>
          
                <View style={styles.InputView} >
                <Feather name="search" size={24} color="black" style={styles.InputIcon} />
                 <TextInput 
                           
                           value={categorie}
                           style={styles.InputText}
                           placeholder="Rechercher par categorie.." 
                           placeholderTextColor="#707070"
                           onChangeText={value => setcategorie(value)}
                           onSubmitEditing={selectPlace}
                 />
               </View>
               <View style={styles.InputView} >
               <Feather name="search" size={24} color="black" style={styles.InputIcon} />
               <TextInput  
                        
                        value={ville}
                        style={styles.InputText}
                        placeholder="Rechercher par ville.." 
                        placeholderTextColor="#707070"
                        onChangeText={value => setville(value)}
                        onSubmitEditing={selectPlace}
                    />

               </View>
          
          
                <FlatList 
                    data={lieu}
                    keyExtractor = {item =>item.id}
                    extraData={isRender}
                    renderItem={({item})=>
                        <TouchableOpacity onPress={()=> navigation.navigate('MapLieu',{ID:item.id,Adresse:item.Adresse,Categorie:item.Categorie,Latitude:item.Latitude,Longtitude:item.Longtitude,Nom:item.Nom,Ville:item.Ville,Image:item.Image })}>
                           <FlatListItem item={item} /> 
                        </TouchableOpacity>
                    }
                />
            
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DAF10C',
      alignItems: 'center',
      paddingTop: "5%",
      paddingBottom: "5%", 
    }, 
    InputView:{
      backgroundColor: '#fff',
      borderColor:"#465881",
      borderRadius:45,
      borderWidth : 2,
      marginBottom:30,
      justifyContent:"center",
      padding:20,
      height : 65,
      width: 350,
    },
    InputText:{
      fontSize : 17,
      left: 20,
      color:"black"
    },
    InputIcon:{
      position:"absolute",
      top:16,
      left:10,
    },
    
  });