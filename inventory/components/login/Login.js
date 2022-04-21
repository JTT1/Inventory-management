import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ImageBackground} from "react-native";
import { loginStyles as styles } from './loginStyles';

import { MaterialIcons } from '@expo/vector-icons';
import ThemeButton from "../testing_field/ThemeButton";
import { db, ROOT_REF, USERS_REF, firebase } from '../../firebase/Config';

 
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = async () => {

    if(handleLogin() == true) {
      try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("kirjautuminen onnistui!");
      routeToHome();
    } catch (err) {
        console.log('Kirjautuminen epäonnistui.', err);
        Alert.alert('Kirjautuminen epäonnistui. ', err.toString());

      }
    }  
  }

  const handleLogin = () => {
    // check login credentials -> route/redirect to home screen
    if (!email.trim()) {
      Alert.alert("Syötä sähköpostisi");
      return false;
    }
  
    if (!password.trim()) {
      Alert.alert("Syötä salasana");
      return false;
    }
  
    return true;
  }



  const routeToRegister = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Rekisteröinti'}]
    });
  }

  const routeToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Koti'}]
    });
  }

  

    //navigation.navigate('Haku')
  

  return (
    
    <View style={[styles.container, styles.centerHorizontal, styles.centerVertical]}>
      <ImageBackground style={styles.backgroundImage} source={require('../../assets/images/login-screen-background.png')}>
      <View style={[styles.centerHorizontal, styles.loginBox, styles.centerVertical]}>
        <Text style={[styles.h2, styles.marginFix]}>Kirjautuminen vaaditaan</Text>
      <Text style={[styles.bodyTextWhite, styles.marginFix, styles.textFix]}>Ole hyvä ja kirjaudu sisään jatkaaksesi</Text>
      <View style={styles.InputView}>
        <Text style={styles.h3}>Sähköposti tai käyttäjänimi</Text>
        <View style={[styles.inputWrapper]}>
          <MaterialIcons
            style={styles.inputIcon}
            name="alternate-email" size={24} color="#6EEEFF" />
        <TextInput
            style={[styles.TextInput]}
          placeholder="Sähköpostiosoite"
          placeholderTextColor="#B4B4B4"
          onChangeText={(email) => setEmail(email)}
        />
        </View>
      </View>
 
      <View style={styles.inputView}>
        <Text style={styles.h3}>Salasana</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Salasana"
          placeholderTextColor="#B4B4B4"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

 
      <View style={styles.marginFix}>
            <ThemeButton color="#F4247C" text="Kirjaudu" onPress={Login} />
      </View>

      <TouchableOpacity>
        <Text style={[styles.bodyTextWhite, styles.marginFix]}
        >Unohditko salasanasi?</Text>
        </TouchableOpacity>


        <Text style={styles.bodyTextWhite}
        >Ei vielä käyttäjätunnusta?</Text> 
      <TouchableOpacity onPress={routeToRegister}>
        <Text style={styles.bodyTextYellow}>Rekisteröidy</Text>
      </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
  }