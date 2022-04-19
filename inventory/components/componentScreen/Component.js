import React from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { styles } from "../../styles/AppRootStyle";

export default function Home() {

const [text, setText] = useState(null);
const [number, setNumber] = useState(null);    

    return (
      <View style={styles.center}>
       <View>
       <View style={styles.background}>
            <View style={styles.widthFix}>
                <Text style={[styles.h1, styles.marginFix]}>Komponentti Proppi tähän</Text>
                <Text style={[styles.h3, styles.marginFix]}>Lisätiedot</Text>
                <Text style={[styles.bodyTextWhite, styles.marginFix]}>Lisätieto Proppi tähän</Text>
            </View>
        </View>
        <Text style={[styles.h2, styles.marginFix]}>Projekti, jolle lainataan:</Text>
        <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder="Projektin nimi"
        />
        <Text style={[styles.h2, styles.marginFix]}>Lainattava määrä:</Text>
        <View style={styles.flexRow}>
            <TextInput
                style={styles.input2}
                onChangeText={setNumber}
                value={number}
                placeholder="1"
                keyboardType="numeric"
            />
            <Text style={[styles.bodyTextWhite, styles.textFix]}>Lainattavissa (määrä prop) kpl</Text>
        </View>
        <View style={styles.center}>
        <Pressable style={[styles.button, styles.buttonFix]}>
        <Text style={[styles.h3]}>LAINAA</Text>
        </Pressable>
        </View>
       </View>
      </View>
    );
  }