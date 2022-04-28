import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Alert, Platform, SafeAreaView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { componentStyles as styles } from '../componentScreen/componentStyles';
import ThemeButton from '../testing_field/ThemeButton';
import { db, LOCKERS_REF, ROOT_REF } from '../../firebase/Config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Picker} from '@react-native-picker/picker';
import { fetchTrays } from '../../helpers/firebaseFunctions';
import uuid from "react-uuid";



export default function AddNewComponent({ navigation }) {

  const [name, setName] = useState('');
  const [id, setId] = useState("");
  const [tray, setTray] = useState("");
  const [info, setInfo] = useState("");
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState("");
  const [selectedTray, setSelectedTray] = useState();
  const [selectedTrayId, setSelectedTrayId] = useState();
  const [trays, setTrays] = useState([])
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(true);

  const detailsRef = useRef();
  let device = "";

  if (Platform.OS == "android") {
    device = "android";
  } else {
    device = "ios";
  }

  useEffect(() => {
    (async () => {
        await fetchTrays()
            .then((res) => {
                if (res.length > 0) {
                    setTrays(res);
                  setSelectedTray(res[0].tarjotinNimi);
                } else {
                    Alert.alert('Virhe', 'Tarjottimia ei pystytty hakemaan!');
                }
            });
    })();
  }, [loaded]);


  const checkInput = () => {
    if (!name.trim()) {
      Alert.alert("Syötä komponentin nimi!")
      return false;
    }
    return true;
  }

  async function add() {
    if (checkInput() !== false) {
      setLoaded(false);
      await db.ref(ROOT_REF).push({
      // ID: id,
        Tarjotin: selectedTray,
        Lisatietoa: info,
        Maara: amount,
        Nimike: name,
        Sijainti: location
      })
        .then((querySnapShot) => {
          const lastPushId = querySnapShot.getKey();

          const [matchingTray] = trays.filter((tray) => (tray.tarjotinNimi === selectedTray))
          let trayItemsCopy = [];
          if (matchingTray && 'trayItems' in matchingTray) {
            trayItemsCopy = [...matchingTray.trayItems];
          }
          trayItemsCopy.push(lastPushId);

          db.ref(LOCKERS_REF + matchingTray.ID).update({
            trayItems: trayItemsCopy
          })
        })
        .finally(() => {
          setName('');
          setTray('');
          setInfo('');
          setAmount('');
          setLocation('');
          setLoaded(true);
          return Alert.alert("Komponentin lisäys onnistui!")
        })
    }
  }



  const trayNames = trays.map((tray) => {
    const returnObj = { name: tray.tarjotinNimi, ID: tray.ID }

    return returnObj
  }
  )
  const pickerItems = trayNames.map(({ name }) => {
    return <Picker.Item key={uuid()} label={name} value={name} />

  })

  if (!loaded) {
    return <ActivityIndicator size={100} color="#1DFFBB" />
  }

    return (
    
      <SafeAreaView style={styles.addComponentBox}>
        <KeyboardAwareScrollView>
          <View style={[styles.addComponentScroll, styles.centerHorizontal, styles.centerVertical]}>
            <Text style={styles.h1}>Lisää komponentteja</Text>
        <View>
          <Text style={styles.h3}>
            Nimi
          </Text>
          <TextInput style={styles.TextInput}
            placeholder="Komponentin nimi"
            onChangeText={setName}
            placeholderTextColor={"white"}
                value={name}
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
                value={amount}
          />
        </View>

      {/* picker tulee tähän */}


      <View style={[styles.projectView]}>
                {device == "android" ? <Picker
                    style= {[styles.projectDropDownAndroid, styles.bodyTextWhite]}
                    selectedValue={selectedTray}
                onValueChange={(itemValue, itemIndex) => setSelectedTray(itemValue)}>
                        {pickerItems}
               </Picker> 

               : <Picker
               style= {[styles.projectDropDownIos, styles.bodyTextWhite]}
               selectedValue={selectedTray}
               onValueChange={(itemValue, itemIndex) => setSelectedTray(itemValue)}>
                   {pickerItems}
          </Picker> }
                   
                   {/* Komponentin toggle-toiminto */}

                    <View style={styles.addComponent}>
                        {/*Here we will return the view when state is true 
                        and will return false if state is false*/}
                        {visible ? (
                        <TextInput
                            style={styles.TextInput}
                            placeholderTextColor="white"
                            placeholder="Projektin nimi"
                            onChangeText={setOther}
                    value={other}
                        />
                        ) : <React.Fragment/>}
                        
                    </View>

                    {/* Komponentin toggle-toiminto */}

                </View>



      {/* picker loppuu tähän  */}





        {/* <View>
          <Text style={styles.h3}>
            Tarjotin
          </Text>
          <TextInput style={styles.TextInput}
            placeholder="Tarjotin"
            onChangeText={setTray}
            placeholderTextColor={"white"}
          />
        </View> */}

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
                  value={info}
            />
          </Pressable>
        </View>

        <View>
          <Text style={styles.h3}>
            Sijainti
          </Text>
          <TextInput style={styles.TextInput}
            placeholder="Jos muualla kuin varastossa"
                onChangeText={setLocation}
            placeholderTextColor={"white"}
                value={location}
          />
        </View>


        <View style={styles.addComponentButton}>
      
            <ThemeButton color="#F4247C" text="Lisää komponentti" onPress={add} />
      
        </View>

          
          </View>
          </KeyboardAwareScrollView>
          </SafeAreaView>
      
    );
  }
