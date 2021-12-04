import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/home';
import AjouterLieu from '../screens/ajouterLieu';
import RechercherLieu from '../screens/rechercherLieu';
import Filtre from '../screens/filtre';
import Categories from '../screens/categories';
import ListLieu from '../screens/listLieu';
import MapLieu from '../screens/MapLieu';
import RestaurantsMapLieus from '../screens/RestaurantsMapLieus';
import BanquesMapLieus from '../screens/BanquesMapLieus';
import BoutiquesMapLieus from '../screens/BoutiquesMapLieus';
import PharmaciesMapLieus from '../screens/PharmaciesMapLieus';
import Header from '../shared/header';
import React from 'react';

const screens = {
    Home: {
        screen:Home,
        navigationOptions:() =>{
            return {
            headerTitle:() =><Header title='SearchApp'/>,
            headerStyle:{}
            }
        }
    },
    AjouterLieu: {
        screen:AjouterLieu,
        navigationOptions:() =>{
            return {
            headerTitle:() =><Header title='Ajouter Lieu'/>,
            headerContent:{alignItems: 'center',justifyContent: 'center',},
            headerStyle:{backgroundColor:'#D50F0F',}
            }
        }
    },
    RechercherLieu: {
        screen:RechercherLieu,
        navigationOptions:() =>{
            return {
            headerTitle:() =><Header title='SearchApp'/>,
            headerStyle:{}
            }
        } 
    },
    Filtre: {
        screen:Filtre,
        navigationOptions:() =>{
            return {
            headerTitle:() =><Header title='SearchApp'/>,
            headerStyle:{}
            }
        } 
    },
    Categories : {
        screen:Categories,
        navigationOptions:() =>{
            return {
            headerTitle:() =><Header title='Categories'/>,
            headerContent:{alignItems: 'center',justifyContent: 'center',},
            headerStyle:{backgroundColor:'#0DF80D',}
            }
        }
    },
    ListLieu: {
        screen:ListLieu,
        navigationOptions:() =>{
            return {
            headerTitle:() =><Header title='SearchApp'/>,
            headerStyle:{}
            }
        } 
    },
    MapLieu: {
        screen:MapLieu,
        navigationOptions:() =>{
            return {
            headerTitle:() =><Header title='SearchApp'/>,
            headerStyle:{}
            }
        } 
    },
    RestaurantsMapLieus : {
        screen:RestaurantsMapLieus,
        navigationOptions:() =>{
            return {
            headerTitle:() =><Header title='Restaurants'/>,
            headerContent:{alignItems: 'center',justifyContent: 'center',},
            headerStyle:{backgroundColor:'#0DF3EC',}
            }
        }
    },
    BanquesMapLieus : {
        screen:BanquesMapLieus,
        navigationOptions:() =>{
            return {
            headerTitle:() =><Header title='Banques'/>,
            headerContent:{alignItems: 'center',justifyContent: 'center',},
            headerStyle:{backgroundColor:'#0DF3EC',}
            }
        }
    },
    BoutiquesMapLieus : {
        screen:BoutiquesMapLieus,
        navigationOptions:() =>{
            return {
            headerTitle:() =><Header title='Boutiques'/>,
            headerContent:{alignItems: 'center',justifyContent: 'center',},
            headerStyle:{backgroundColor:'#0DF3EC',}
            }
        }
    },
    PharmaciesMapLieus : {
        screen:PharmaciesMapLieus,
        navigationOptions:() =>{
            return {
            headerTitle:() =><Header title='Pharmacies'/>,
            headerContent:{alignItems: 'center',justifyContent: 'center',},
            headerStyle:{backgroundColor:'#0DF3EC',}
            }
        }
    },
}

const HomeStack = createStackNavigator(screens) ;

export default createAppContainer(HomeStack) ;