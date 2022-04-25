import React, { useState } from 'react';
import { View, Text} from 'react-native';
import { styles } from '../../styles/AppRootStyle';



export default function AddNewComponent() {

    const [name, setName] = useState('');
    const [id, setId] = useState("");
    const [tray, setTray] = useState("");
    const [info, setInfo] = useState("");
    const [amount, setAmount] = useState(1);
    const [location, setLocation] = useState("");
  
  
  
    function addNewItem() {
      if (newItem.trim() !== "") {
        db.ref(ROOT_REF).push({
          ID: id,
          Tarjotin: tray,
          Lisätieto: info,
          Määrä: amount,
          Nimike: name,
          Sijainti: location
        })
        setNewItem('');
        setCategory('');
        setId('');
        setInfo('');
        setAmount(1);
        setLocation('');
      }
    }
  
  
  
    return (
      <View style={[styles.container, styles.mainBox]}>
        <Text style={styles.h1}>Lisää komponentteja</Text>

      </View>
    );
  }