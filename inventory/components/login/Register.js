import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Touchable, Alert, ScrollView } from "react-native";
import { styles } from "../../styles/AppRootStyle";
import { db, ROOT_REF, USERS_REF } from '../../firebase/Config';
import { MaterialIcons } from '@expo/vector-icons';
import ThemeButton from "../testing_field/ThemeButton";



const checkInput = () => {
  if (!etunimi.trim()) {
    Alert.alert("Syötä nimesi");
    return false;
  }

  if (!sukunimi.trim()) {
    Alert.alert("Syötä nimesi");
    return false;
  }

  if (!email.trim()) {
    Alert.alert("Syötä sähköpostisi");
    return false;
  }

  if (!password1.trim()) {
    Alert.alert("Syötä salasana");
    return false;
  }

  if (!password2.trim()) {
    Alert.alert("Vahvista salasana");
    return false;
  }

  return true;

}


export default function Register({ navigation }) {
    const [etunimi, setEtunimi] = useState("");
    const [sukunimi, setSukunimi] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [tark, setTark] = useState(true);
    

    const checkInput = () => {
      if (!etunimi.trim()) {
        Alert.alert("Syötä nimesi");
        return false;
      }
    
      if (!sukunimi.trim()) {
        Alert.alert("Syötä nimesi");
        return false;
      }
    
      if (!email.trim()) {
        Alert.alert("Syötä sähköpostisi");
        return false;
      }
    
      if (!password1.trim()) {
        Alert.alert("Syötä salasana");
        return false;
      }
    
      if (!password2.trim()) {
        Alert.alert("Vahvista salasana");
        return false;
      }
    
      return true;
    
    }

    function clear() {
      setEtunimi("");
      setSukunimi("");
      setEmail("");
      setPassword1("");
      setPassword2("");
      console.log("testi");
    }


    function addUser() {
      if (password1 !== password2) {
        Alert.alert("Salasanasi ei täsmää!")
      } else {
        if (checkInput() !== false) {
          db.ref(USERS_REF).push({
            etunimi: etunimi,
            sukunimi: sukunimi,
            email: email,
            password: password1,
          })
          clear();
        }
      }
      }

  const routeToLogin = () => {
    navigation.navigate('Kirjautuminen');
  }




    return (
        <ScrollView Style={styles.container}>
          <View style={styles.registerCenter}>
        <Text style={styles.h3}>Rekisteröidy käyttäjäksi</Text>
        <Text style={styles.bodyTextWhite}>Täytä tietosi alla oleviin kenttiin luodaksesi käyttäjän</Text>

      <View style={styles.InputView}>
        <Text style={styles.h4}>Etunimi</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Etunimi"
          placeholderTextColor="#B4B4B4"
          onChangeText={setEtunimi}
        />
      </View>
 
      <View style={styles.inputView}>
        <Text style={styles.h4}>Sukunimi</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Sukunimi"
          placeholderTextColor="#B4B4B4"
          onChangeText={setSukunimi}
        />
      </View>

      <View style={styles.testi1}>
      <Text style={styles.testi2}>Lisää kuva</Text>
      <TouchableOpacity>
      <Image
        style={styles.testi3}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/m12f6kbazad-285%3A1572?alt=media&token=262ff6d3-8cee-4f50-bf7a-6bf718aa87cf",
        }}
      />
      </TouchableOpacity>
    </View>

      <View style={styles.inputView}>
        <Text style={styles.h4}>Sähköposti</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Sähköposti"
          placeholderTextColor="#B4B4B4"
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputView}>
        <Text style={styles.h4}>Salasana</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Salasana"
          placeholderTextColor="#B4B4B4"
          secureTextEntry={true}
          onChangeText={setPassword1}
        />
      </View>

      <View style={styles.inputView}>
        <Text style={styles.h4}>Vahvista salasana</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Salasana"
          placeholderTextColor="#B4B4B4"
          secureTextEntry={true}
          onChangeText={setPassword2}
        />
      </View>

 
      <View style={styles}>
      
            <ThemeButton color="#F4247C" text="Rekisteröidy" onPress={addUser} />
      

      </View>

        <Text style={styles.bodyTextWhite}
          >Rekisteröitynyt jo?</Text>
          <TouchableOpacity onPress={routeToLogin}>
            <Text style={styles.bodyTextYellow}>Kirjaudu</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}
