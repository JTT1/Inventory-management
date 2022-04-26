import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { styles } from '../../styles/AppRootStyle';



export default function AddNewComponent({ navigation }) {

    const [name, setName] = useState('');
    const [id, setId] = useState("");
    const [tray, setTray] = useState("");
    const [info, setInfo] = useState("");
    const [amount, setAmount] = useState(1);
    const [location, setLocation] = useState("");
    const detailsRef = useRef();
  
  
  
    function addNewItem() {
      if (newItem.trim() !== "") {
        db.ref(ROOT_REF).push({
          // ID: id,
          Tarjotin: tray,
          Lisätieto: info,
          Määrä: amount,
          Nimike: name,
          Sijainti: location
        })
        setName('');
        setTray('');
        setInfo('');
        setAmount(1);
        setLocation('');
      }
    }
  
  
  
    return (
      <View style={[styles.container, styles.mainBox]}>
        <Text style={styles.h1}>Lisää komponentteja</Text>

        <ScrollView contentContainerStyle={[styles.centerHorizontal, styles.centerVertical]}>

          <View>
            <Text style={styles.h3}>
              Nimi
            </Text>
            <TextInput style={styles.TextInput}
              placeholder="Komponentin nimi"
              onChangeText={setName}
              placeholderTextColor={"white"}
            />
          </View>

          <View>
            <Text style={styles.h3}>
              Määrä
            </Text>
            <TextInput style={styles.TextInput}
              placeholder="Komponentin määrä"
              onChangeText={setAmount}
              placeholderTextColor={"white"}
            />
          </View>

          <View>
            <Text style={styles.h3}>
              Tarjotin
            </Text>
            <TextInput style={styles.TextInput}
              placeholder="Tarjotin"
              onChangeText={setTray}
              placeholderTextColor={"white"}
            />
          </View>

          <View>
            <Text style={styles.h3}>
              Lisätietoa
            </Text>
            <Pressable onPress={() => detailsRef.current.focus()}
            style={styles.largeTextInput}>
            <TextInput
              multiline
              maxLength={255}
              ref={detailsRef}
              placeholder="Lisätietoa"
              onChangeText={setInfo}
              placeholderTextColor={"white"}
            />
            </Pressable>
          </View>

          <View>
            <Text style={styles.h3}>
              Sijainti
            </Text>
            <TextInput style={styles.TextInput}
              placeholder="Jos muualla kuin varastossa"
              onChangeText={setTray}
              placeholderTextColor={"white"}
            />
          </View>




        </ScrollView>

      </View>
    );
  }