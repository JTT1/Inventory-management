import React, { useContext, useState, useEffect, useRef} from "react";
import { Text, View, TextInput, Alert, Platform, SafeAreaView, Button, TouchableOpacity, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { fetchAllItems } from "../../helpers/firebaseFunctions";
import { returnLoanStyles as styles } from "../returnloan/ReturnLoanStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TrayList from "./trayList";



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

    console.log(dbItems);


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


        </View>
        </KeyboardAwareScrollView>
        </SafeAreaView>
    );

}