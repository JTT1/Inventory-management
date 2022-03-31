import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, View, Button, Alert, TextInput } from 'react-native';
import Componentlist from './components/Componentlist';

import { db, ROOT_REF } from './firebase/Config';
import { Components } from './components/Items';

export default function App() {

  const [items, setItems] = useState({});


  return (
    <View style={styles.container}>
      <Componentlist/>
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
