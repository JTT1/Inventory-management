import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, View, Button, Alert, TextInput } from 'react-native';
import { db, ROOT_REF } from './firebase/Config';
import { Components } from './components/Items';

export default function App() {

  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState({});



  function addNewItem() {
    if (newItem.trim() !== "") {
      db.ref(ROOT_REF).push({
        done: false,
        item: newItem
      })
      setNewItem('');
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
