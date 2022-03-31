import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, View, Button, Alert, TextInput } from 'react-native';
import { db, ROOT_REF } from '../firebase/Config';
import { Components } from './Items';

export default function AddNewComponent() {

  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState({});
  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [info, setInfo] = useState("");
  const [amount, setAmount] = useState(0);
  const [location, setLocation] = useState("");



  function addNewItem() {
    if (newItem.trim() !== "") {
      db.ref(ROOT_REF).push({
        ID: id,
        Kategoria: category,
        Lisätieto: info,
        Määrä: amount,
        Nimike: newItem,
        Sijainti: location
      })
      setNewItem('');
      setCategory('');
      setId('');
      setInfo('');
      setAmount('');
      setLocation('');
    }
  }



  return (
    <View style={styles.layer}>
      <Text>Lisää komponentti</Text>
      <View>
          <Text style={styles.text}>
              Nimi
          </Text>
        <TextInput
        style={styles.textField}
          value={newItem}
          onChangeText={setNewItem}
          placeholder="Komponentin nimi"
        />
        <TextInput
        style={styles.textField}
          value={id}
          onChangeText={setId}
          placeholder="Komponentin ID"
        />
        <TextInput
        style={styles.textField}
          value={category}
          onChangeText={setCategory}
          placeholder="Komponentin kategoria"
        />
        <TextInput
        style={styles.textField}
          value={amount}
          onChangeText={setAmount}
          placeholder="Komponenttien määrä"
        />
        <TextInput
        style={styles.textField}
          value={location}
          onChangeText={setLocation}
          placeholder="Komponentin sijainti"
        />
        <TextInput
        style={styles.textFieldLarge}
          value={info}
          onChangeText={setInfo}
          placeholder="Lisätietoa"
        />
        
      </View>
      <View>
        <Button
        style={styles.button}
          title="Lisää"
          onPress={() => addNewItem()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    backgroundColor: '#393663',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 4,
  },
  button: {
      padding: 5,
      margin: 15,
  }, 
  textField: {
    backgroundColor: "#8F8ABF",
    borderRadius: 25,
    padding: 10,
    marginBottom: 15,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  textFieldLarge: {
    backgroundColor: "#8F8ABF",
    borderRadius: 25,
    padding: 10,
    marginBottom: 15,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontWeight: 600,
  }
});
