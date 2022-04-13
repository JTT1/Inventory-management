import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Touchable, } from "react-native";
import { styles } from "../../styles/AppRootStyle";
import { MaterialIcons } from '@expo/vector-icons';

export default function Register() {
    const [etunimi, setEtunimi] = useState("");
    const [sukunimi, setSukunimi] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.inputView}>
        <Text style={styles.h4}>Vahvista salasana</Text>
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
        <Text style={styles.h3}>Rekisteröidy</Text>
      </TouchableOpacity>
      </View>

        <Text style={styles.bodyTextWhite}
        >Rekisteröiytynyt jo?</Text> 
        <Text style={styles.bodyTextYellow}><TouchableOpacity>Kirjaudu</TouchableOpacity></Text>
    </View>
  );
}
