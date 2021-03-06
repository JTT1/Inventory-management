import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, View, Button, Alert, TextInput } from 'react-native';
import { db, ROOT_REF } from '../../firebase/Config';
import AddNewComponent from './AddNewComponent';
import { Components } from './Items';

export default function Componentlist() {

    const [items, setItems] = useState({});
    const [Show, setShow] = useState(false);

    const [addWord, setAddWord] = useState("Lisää");
    const [status, setStatus] = useState(false);


    
    function toggle() {
        setShow(!Show)

        if (status == false) {
            setStatus(!status);
            setAddWord("Pienennä");
        } else {
            setStatus(!status);
            setAddWord("Lisää");
        }
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

     {/* Komponentin toggle-toiminto */}

      <View style={styles.addComponent}>
        {/*Here we will return the view when state is true 
        and will return false if state is false*/}
        {Show ? (
          <AddNewComponent/>
        ) : null}
        <Button
          title={addWord}
          onPress={() => toggle()}
        />
      </View>

    {/* Komponentin toggle-toiminto */}

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
  addComponent: {
      marginBottom: 25,
      marginTop: 25,
  },
  button: {
      marginBottom: 5,
      marginTop: 5,
  }
});
