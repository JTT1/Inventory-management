import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, Alert, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { styles } from '../../styles/AppRootStyle';
import ThemeButton from '../testing_field/ThemeButton';
import { db, ROOT_REF } from '../../firebase/Config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default function AddNewComponent({ navigation }) {

  const [name, setName] = useState('');
  const [id, setId] = useState("");
  const [tray, setTray] = useState("");
  const [info, setInfo] = useState("");
  const [amount, setAmount] = useState(1);
  const [location, setLocation] = useState("");
  const detailsRef = useRef();


  const checkInput = () => {
    if (!name.trim()) {
      Alert.alert("Syötä komponentin nimi!")
      return false;
    }

    return true;
  }




  function add() {
    if (checkInput() !== false) {
      db.ref(ROOT_REF).push({
        // ID: id,
        Tarjotin: tray,
        Lisatietoa: info,
        Maara: amount,
        Nimike: name,
        Sijainti: location
      })
      setName('');
      setTray('');
      setInfo('');
      setAmount(1);
      setLocation('');
      Alert.alert("Komponentin lisäys onnistui!")
    }
  }






  return (

    <SafeAreaView style={styles.addComponentBox}>
      <KeyboardAwareScrollView contentContainerStyle={[styles.addComponentScroll, styles.centerHorizontal, styles.centerVertical]}>



        <Text style={styles.h1}>Lisää komponentteja</Text>

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


        <View style={styles.addComponentButton}>

          <ThemeButton color="#F4247C" text="Lisää komponentti" onPress={add} />


        </View>



      </KeyboardAwareScrollView>
    </SafeAreaView>

  );
}