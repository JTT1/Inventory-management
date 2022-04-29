import React, { useContext, useState, useEffect, useRef} from "react";
import { Text, View, TextInput, Alert, Platform, SafeAreaView, Button, TouchableOpacity, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fetchAllItems } from "../../helpers/firebaseFunctions";
import { returnLoanStyles as styles } from "../returnloan/ReturnLoanStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TrayList from "./trayList";
import ThemeButton from "../testing_field/ThemeButton";
import { LOCKERS_REF, db } from "../../firebase/Config";



export default function AddTrays({ navigation }) {
    const [name, setName] = useState('');
    const [locker, setLocker] = useState('');
    const [door, setDoor] = useState('');
    const [item, setItem]= useState('');
    const [term, setTerm] = useState('');
    const [items, setItems] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [dbItems, setDbItems] = useState([]);

    useEffect(() => {
        (async () => {
            fetchAllItems()
                .then((res) => {
                    if (res.length > 0) {
                        setItems(res);
                    } else {
                        Alert.alert('Virhe', 'Komponentteja ei pystytty hakemaan.');
                    }
                });
        })();
    }, []);


    const handleSearchSubmit = () => {
        let itemsCopy = [...items]

        let filteredItems = itemsCopy.filter((item) => (item.Nimike.includes(term)));

        setSearchResults(filteredItems)
    }

    const checkInput = () => {

        if (!name.trim()) {
            Alert.alert("Anna tarjottimelle nimi!");
            return false;
        }

        if (!locker.trim() || !door.trim()) {
            Alert.alert("Syötä tarjottimelle sijainti! Kaappi sekä ovi")
            return false;
        }

        if (!dbItems) {
            Alert.alert("Tarjotin luotu tyhjänä. Syötä tarjottimelle komponentit erikseen")
            return true;
        }

        return true;

    }

    const routeToScreen = () => {
        navigation.goBack();
    }

    const submitTray = () => {
        if(checkInput() !== false) {
            db.ref(LOCKERS_REF).push({
                tarjotinNimi: name,
                kaappi: locker,
                ovi: door,
                trayItems: dbItems,
              })
            setName('');
            setLocker('');
            setDoor('');
            setDbItems([]);
            Alert.alert("Tarjotin luotu onnistuneesti!");
            routeToScreen();
        }
    }


    return (
        <SafeAreaView style={styles.addComponentBox}>
        <KeyboardAwareScrollView>
        <View style={[styles.addComponentScroll, styles.centerHorizontal, styles.centerVertical]}>
            
            <View>
                <Text style={styles.h3}>
                    Tarjottimen nimi
                </Text>
                <TextInput style={styles.TextInput}
                    placeholder="Tarjottimen nimi sekä QR koodi"
                    onChangeText={setName}
                    placeholderTextColor={"gray"}
                />
            </View>

            <View>
                <Text style={styles.h3}>
                    Tarjottimen sijainti - Kaappi
                </Text>
                <TextInput style={styles.TextInput}
                    placeholder="Kaappi"
                    onChangeText={setLocker}
                    placeholderTextColor={"gray"}
                />
            </View>

            <View>
                <Text style={styles.h3}>
                    Tarjottimen sijainti - Ovi
                </Text>
                <TextInput style={styles.TextInput}
                    placeholder="Ovi"
                    onChangeText={setDoor}
                    placeholderTextColor={"gray"}
                />
            </View>

            <View>
                <Text style={styles.h3}>
                    Lisää komponentteja tarjottimeen
                </Text>
                <TextInput style={styles.TextInput}
                    placeholder="Kirjoita komponentin ID"
                    onChangeText={setTerm}
                    placeholderTextColor={"gray"}
                    onSubmitEditing={handleSearchSubmit}
                />


            <View>
                {searchResults.map((item) =>
                    <TrayList key={item.ID} item={item} styles={styles} dbItems={dbItems} setDbItems={setDbItems}/>
                )}
            </View>
            

            </View>

                <View style={styles.center}>
                    <ThemeButton color="#F4247C" text="Luo tarjotin" onPress={submitTray} />
                </View>

        </View>
        </KeyboardAwareScrollView>
        </SafeAreaView>
    );

}