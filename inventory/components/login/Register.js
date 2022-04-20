import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Touchable, Alert, ScrollView } from "react-native";
import { styles } from "../../styles/AppRootStyle";
import { db, ROOT_REF, USERS_REF, firebase } from '../../firebase/Config';
import { MaterialIcons } from '@expo/vector-icons';
import ThemeButton from "../testing_field/ThemeButton";
import  { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseApp } from "@firebase/app";
import { async } from "@firebase/util";


export default function Register({ navigation }) {
    const [etunimi, setEtunimi] = useState("");
    const [sukunimi, setSukunimi] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const routeToLogin = () => {
      navigation.navigate('Kirjautuminen');
    }

    const createAccount = async () => {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password1);
        const currentUser = firebase.auth().currentUser;
        firebase.database().ref(USERS_REF + currentUser.uid).set({
          email: currentUser.email,
          etunimi: etunimi,
          sukunimi: sukunimi,
          password: password1,
          rooli: "user",
        })
      } catch (err) {
          Alert.alert("Rekisteröinti epäonnistui!", err.toString());
        }
      
    }
    

    const checkInput = () => {

      let passwordLength = password1.length;

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

      if (email.includes(' ')) {
        Alert.alert("Älä käytä välilyöntejä!");
        return false;
      }

      if (!email.includes('@')) {
        Alert.alert("Kirjoita sähköpostiosoite!");
        return false;
      }

      if (!email.includes('@students.oamk.fi')) {
        Alert.alert("Käytä koulun sähköpostia!");
        return false;
      }

      if (passwordLength < 6) {
        Alert.alert("Salasanan tulee olla vähintään 6 merkkiä");
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

    const clear = () => {
      setEtunimi("");
      setSukunimi("");
      setEmail("");
      setPassword1("");
      setPassword2("");
    }


    function addUser() {
      if (password1 !== password2) {
        Alert.alert("Salasanasi ei täsmää!")
      } else {
        if (checkInput() !== false) {
            createAccount();
            clear();
            routeToLogin();
          }
        }
      }





    return (
      <View style={styles.registerCenter}>
        <ScrollView contentContainerStyle={styles.registerScroll}>
        <Text style={styles.h3}>Rekisteröidy käyttäjäksi</Text>
        <Text style={styles.bodyTextWhite}>Täytä tietosi alla oleviin kenttiin luodaksesi käyttäjän</Text>

      <View style={styles.inputView}>
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

      {/* <View style={styles.testi1}>
      <Text style={styles.testi2}>Lisää kuva</Text>
      <TouchableOpacity>
      <Image
        style={styles.testi3}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/m12f6kbazad-285%3A1572?alt=media&token=262ff6d3-8cee-4f50-bf7a-6bf718aa87cf",
        }}
      />
      </TouchableOpacity>
    </View> */}

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

      <View style={styles.registerBottom}>
        <Text style={styles.bodyTextWhite}
          >Rekisteröitynyt jo?</Text>
          <TouchableOpacity onPress={routeToLogin}>
            <Text style={styles.bodyTextYellow}>Kirjaudu</Text>
          </TouchableOpacity>
      </View>
        </ScrollView>
        </View>
    
  );
}
