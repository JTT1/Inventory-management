import React, { useContext, useState, useEffect } from "react";
import { Text, View, TextInput, Alert, Platform, SafeAreaView } from 'react-native';
import { styles } from "../../styles/AppRootStyle";
import ThemeButton from "../testing_field/ThemeButton";


export default function AddScreen({ navigation }) {
    const [name, setName] = useState('');
    const [locker, setLocker] = useState('');
    const [door, setDoor] = useState('');
    const [items, setItems]= useState([]);



    const routeToAddComponents = () => {
        navigation.navigate('Lisää');
      }

    const routeToAddTrays = () => {
        navigation.navigate('Luo');
    }


    return (
        <View style={styles.screen}>
            
                <View style={styles.center}>
                    <ThemeButton color="#F4247C" text="Lisää komponentteja" onPress={routeToAddComponents} />
                </View>

                <View style={styles.center}>
                    <ThemeButton color="#F4247C" text="Luo Tarjotin" onPress={routeToAddTrays} />
                </View>



        </View>
    );

}