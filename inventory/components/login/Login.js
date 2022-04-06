import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, } from "react-native";
 
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
        <View style={styles.container}>
        <Text style={styles.kirjautuminen}>Kirjautuminen vaaditaan</Text>
        <Text style={styles.kirjautuminenvaaditaan}>Ole hyvä ja kirjaudu sisään jatkaaksesi</Text>

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Sähköpostiosoite"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Salasana"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

 
      <View style={styles.Rectangle4}>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.kirjautuminen}>Kirjaudu</Text>
      </TouchableOpacity>
      </View>


      <TouchableOpacity>
        <Text style={styles.forgot_button}
        >Ei vielä käyttäjätunnusta? Rekisteröidy</Text>
        </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2C2A4C",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 20,
    marginBottom: 70,
    color: "white",
  },

  kirjautuminenvaaditaan: {
    height: 70,
    marginBottom: 70,
    color: "white",
  },
 
  kirjautuminen: {
    fontSize: 20,
    //fontFamily: "Quicksand, sans-serif",
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
    textTransform: "uppercase",
    height: 30,

  },


  Rectangle4: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 50,
    backgroundColor: "rgba(244,36,124,1)",
    shadowColor: "rgba(0,0,0,0.25)",
    elevation: 1,
    shadowOffset: { width: 0, height: 4 },
    width: 191.21,
    height: 46.67,
},




});