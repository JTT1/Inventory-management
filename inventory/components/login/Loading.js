import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { firebase } from '../../firebase/Config';
import { getUserData, userStatus } from '../../helpers/firebaseFunctions';
import styles from '../../styles/AppRootStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LoadingScreen({ navigation }) {


    useEffect(() => {
      if (userStatus() !== null) {
          navigation.reset({
          index: 0,
          routes: [{name: 'Koti'}]
        });
        return;
      } else {
          navigation.reset({
          index: 0,
          routes: [{name: 'Kirjautuminen'}]
        }); 
        return;
      }
    }, [])

      

    
    

    return (
        <View>
            <ActivityIndicator size="large"/>
        </View>
    )


}