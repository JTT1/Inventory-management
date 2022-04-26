import React, { useEffect, useContext, useState } from 'react';
import { ActivityIndicator, View, Alert, Text } from 'react-native';
import { userStatus, fetchUser } from '../../helpers/firebaseFunctions';
import { styles } from '../../styles/AppRootStyle';
import { UserContext } from '../../components/context/userContext';

export default function LoadingScreen({ navigation }) {
  const [status, setStatus] = useState('');
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const userState = await userStatus(); // checks user from async storage
      if (userState !== null) { // if found from async storage
        setStatus('sisään');
        await fetchUser(userState)
          .then((res) => {
            if (res) { // user data successfully retrieved from Firebase
              setUser(res);
              navigation.reset({
                index: 0,
                routes: [{ name: 'Koti' }]
              });
            } else { // if not found, alert error and redirect back to login
              Alert.alert('Virhe', 'Käyttäjätietoja ei löytynyt.');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Kirjautuminen' }]
              });
            }
          })
      } else { // if no user found from async storage -> start by logging in
        console.log('No @UserInfo in async storage')
        setStatus('ulos');
          navigation.reset({
          index: 0,
          routes: [{name: 'Kirjautuminen'}]
          }); 
      }
    })();
  }, [])

    return (
      <View style={[styles.container, styles.centerVertical]}>
        <ActivityIndicator size={100} color="#1DFFBB" />
        <Text style={[styles.bodyTextWhite, styles.selfCenterHorizontal]}>Kirjaudutaan {status}</Text>
        </View>
    )
}