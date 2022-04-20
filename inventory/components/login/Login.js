import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert} from "react-native";
import { styles } from "../../styles/AppRootStyle";
import { MaterialIcons } from '@expo/vector-icons';
import ThemeButton from "../testing_field/ThemeButton";
import { db, ROOT_REF, USERS_REF } from '../../Firebase/Config';
import auth from '@react-native-firebase/auth';



 
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    navigation.navigate('Rekisteröinti')
  }

  

    //navigation.navigate('Haku')
  

  return (
    <View style={[styles.container, styles.centerHorizontal]}>
        <Text style={styles.h1}>Kirjautuminen vaaditaan</Text>
      <Text style={styles.bodyTextWhite}>Ole hyvä ja kirjaudu sisään jatkaaksesi</Text>
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

 
      <View style={styles}>
        <ThemeButton color="#F4247C" text="Kirjaudu" onPress={handleLogin} />
      </View>

      <TouchableOpacity>
        <Text style={styles.bodyTextWhite}
        >Unohditko salasanasi?</Text>
        </TouchableOpacity>


        <Text style={styles.bodyTextWhite}
        >Ei vielä käyttäjätunnusta?</Text> 
      <TouchableOpacity onPress={routeToRegister}>
        <Text style={styles.bodyTextYellow}>Rekisteröidy</Text>
      </TouchableOpacity>
    </View>
  );
  }