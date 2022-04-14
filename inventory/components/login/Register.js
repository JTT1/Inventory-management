import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Touchable, Alert } from "react-native";
import { styles } from "../../styles/AppRootStyle";
import { db, ROOT_REF, USERS_REF } from '../../Firebase/Config';
import { MaterialIcons } from '@expo/vector-icons';
import ThemeButton from "../testing_field/ThemeButton";



const checkInput = () => {
  if (!etunimi.trim()) {
    Alert.alert("Syötä nimesi");
  }
}


export default function Register() {
    const [etunimi, setEtunimi] = useState("");
    const [sukunimi, setSukunimi] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [tark, setTark] = useState(false);
    


    function addUser() {
      if (password1 !== password2) {
        Alert.alert("Salasanasi ei täsmää!")
      } else {
        if (check() == true) {
          db.ref(USERS_REF).push({
            all
          })
          setEtunimi('');
          setSukunimi('');
          setEmail('');
          setPassword1('');
          setPassword2('');
        }
      }
      }


      




    return (
        <View style={styles.container}>
        <Text style={styles.h3}>Rekisteröidy käyttäjäksi</Text>
        <Text style={styles.bodyTextWhite}>Täytä tietosi alla oleviin kenttiin luodaksesi käyttäjän</Text>

      <View style={styles.InputView}>
        <Text style={styles.h4}>Etunimi</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Etunimi"
          placeholderTextColor="#B4B4B4"
          onChangeText={(etunimi) => setEtunimi(etunimi)}
        />
      </View>
 
      <View style={styles.inputView}>
        <Text style={styles.h4}>Sukunimi</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Sukunimi"
          placeholderTextColor="#B4B4B4"
          onChangeText={(sukunimi) => setSukunimi(sukunimi)}
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
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <Text style={styles.h4}>Salasana</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Salasana"
          placeholderTextColor="#B4B4B4"
          secureTextEntry={true}
          onChangeText={(password1) => setPassword1(password1)}
        />
      </View>

      <View style={styles.inputView}>
        <Text style={styles.h4}>Vahvista salasana</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Salasana"
          placeholderTextColor="#B4B4B4"
          secureTextEntry={true}
          onChangeText={(password2) => setPassword2(password2)}
        />
      </View>

 
      <View style={styles}>
      
        <ThemeButton color="#F4247C" text="Rekisteröidy" onPress={addUser}/>
      
      </View>

        <Text style={styles.bodyTextWhite}
        >Rekisteröiytynyt jo?</Text> 
        <TouchableOpacity><Text style={styles.bodyTextYellow}>Kirjaudu</Text></TouchableOpacity>
    </View>
  );
}
