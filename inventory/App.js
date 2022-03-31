import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, View, Button, Alert, TextInput } from 'react-native';
import Componentlist from './components/Componentlist';


export default function App() {

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
