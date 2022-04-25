import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { firebase } from '../../firebase/Config';
import { getUserData, userStatus, fetchUser } from '../../helpers/firebaseFunctions';
import styles from '../../styles/AppRootStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../components/context/userContext';

export default function LoadingScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const userState = await userStatus();
      if (userState !== null) {
        await fetchUser(userState)
          .then((res) => {
            setUser(res)
          }).
          finally(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Koti' }]
          });
          });
      } else {
        setUser({});
          navigation.reset({
          index: 0,
          routes: [{name: 'Kirjautuminen'}]
          }); 
      }
    })();
  }, [])

    return (
      <View style={{ backgroundColor: '#2C2A4C', flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={100} color="#1DFFBB" />
        </View>
    )
}