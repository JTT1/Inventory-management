import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { firebase } from '../../firebase/Config';
import { getUserData } from '../../helpers/firebaseFunctions';
import styles from '../../styles/AppRootStyle';



export default function LoadingScreen({ navigation }) {
    // useEffect(() => {
    //   firebase.auth().onAuthStateChanged((user) => {
    //       if (user) {
    //         navigation.reset({
    //             index: 0,
    //             routes: [{name: 'Koti'}]
    //           });
    //       } else {
    //         navigation.reset({
    //             index: 0,
    //             routes: [{name: 'Kirjautuminen'}]
    //           });          
    //         }
    //   });
    // }, [])

    if (getUserData() !== false) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Koti'}]
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Kirjautuminen'}]
      }); 
    }
    

    return (
        <View>
            <ActivityIndicator size="large"/>
        </View>
    )


}