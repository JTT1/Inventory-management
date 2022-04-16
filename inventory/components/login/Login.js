import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, } from "react-native";
import { styles } from "../../styles/AppRootStyle";
import { MaterialIcons } from '@expo/vector-icons';
import ThemeButton from "../testing_field/ThemeButton";
 
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const routeToRegister = () => {
    navigation.navigate('Rekisteröinti')
  }

  const handleLogin = () => {
    // check login credentials -> route/redirect to home screen

    navigation.navigate('Haku')
  }

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