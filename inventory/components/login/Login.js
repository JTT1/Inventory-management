import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, } from "react-native";
import { styles } from "../../styles/AppRootStyle";
import { MaterialIcons } from '@expo/vector-icons';
 
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
        <View style={styles.container}>
        <Text style={styles.h1}>Kirjautuminen vaaditaan</Text>
        <Text style={styles.bodyTextWhite}>Ole hyvä ja kirjaudu sisään jatkaaksesi</Text>

      <View style={styles.InputView}>
        <Text style={styles.h3}>Sähköposti tai käyttäjänimi</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Sähköpostiosoite"
          placeholderTextColor="#B4B4B4"
          onChangeText={(email) => setEmail(email)}
        />
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.h3}>Kirjaudu</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.bodyTextWhite}
        >Unohditko salasanasi?</Text>
        </TouchableOpacity>


        <Text style={styles.bodyTextWhite}
        >Ei vielä käyttäjätunnusta?</Text> 
        <Text style={styles.bodyTextYellow}><TouchableOpacity>Rekisteröidy</TouchableOpacity></Text>
    </View>
  );
}