import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, View, Button, Alert, TextInput } from 'react-native';
import { db, ROOT_REF } from '../firebase/Config';
import { Components } from './Items';

export default function Componentlist() {

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

  function removeItems() {
    db.ref(ROOT_REF).remove();
  }

  useEffect(() => {
    db.ref(ROOT_REF).on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let items = { ...data };
      setItems(items);
    });
  }, []);

  let itemKeys = Object.keys(items);

  return (
    <View style={styles.container}>
      <Text>Komponentit</Text>
      <View>
        <TextInput
          value={newItem}
          onChangeText={setNewItem}
          placeholder="Komponentin nimi"
        />
        <TextInput
          value={id}
          onChangeText={setId}
          placeholder="Komponentin ID"
        />
        <TextInput
          value={category}
          onChangeText={setCategory}
          placeholder="Komponentin kategoria"
        />
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Komponenttien määrä"
        />
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Komponentin sijainti"
        />
        <TextInput
          value={info}
          onChangeText={setInfo}
          placeholder="Lisätietoa"
        />
        
      </View>
      <View>
        <Button
          title="Lisää komponentti"
          onPress={() => addNewItem()}
        />
      </View>
      <ScrollView>
        {itemKeys.length > 0 ? (
          itemKeys.map(key => (
            <Components
              key={key}
              id={key}
              component={items[key]}
            />
          ))
        ) : (
          <Text>Ei ole komponentteja</Text>
        )}
        <View>
          <Button
            title="Poista kaikki"
            onPress={() => removeItems()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
