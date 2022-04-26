import React, { useContext } from "react";
import { Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { componentStyles as styles } from './componentStyles';
import ThemeButton from '../testing_field/ThemeButton';
import { createNewLoan } from '../../helpers/firebaseFunctions';
import { UserContext } from '../context/userContext.js';

export default function Home({ navigation, route }) {
    const [text, setText] = useState(null);
    const [amount, setAmount] = useState(null);
    const { user } = useContext(UserContext);
    const userId = user.ID
    const userEmail = user.email;

    const item = route?.params.item;

    const handleNewLoan = async () => {
        const newLoanData = {
            komponentti: item.Nimike,
            lainattuMaara: Number(amount),
            projekti: text,
            userID: userId,
            userEmail: userEmail
        }
        await createNewLoan(newLoanData).then((res) => {
            if (res.length > 0) {
                return Alert.alert('Lainaus epäonnistui', res)
            } else {
                setText('');
                setAmount('');
                navigation.navigate('Vahvistus', {
                    returnLoan: false
                });
            }
        }
        );
    };

    return (
        <View style={styles.center}>
            <View>
                <View style={[styles.background, styles.itemInfo]}>
                    <Text style={[styles.h1, styles.marginFix]}>{item.Nimike}</Text>
                    {item.Lisatietoa.length > 0 &&
                        <View>
                            <Text style={[styles.h3, styles.marginFix]}>Lisätiedot</Text>
                            <Text style={[styles.bodyTextWhite, styles.marginFix]}>{item.Lisatietoa}</Text>
                    </View>
                    }
                </View>
                <Text style={[styles.h2, styles.marginFix]}>Projekti, jolle lainataan:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    placeholderTextColor={"#B4B4B4"}
                    value={text}
                    placeholder="Projektin nimi"
                />
                <Text style={[styles.h2, styles.marginFix]}>Lainattava määrä:</Text>
                <View style={[styles.flexRow, styles.centerHorizontal]}>
                    <TextInput
                        style={[styles.input2]}
                        onChangeText={setAmount}
                        placeholderTextColor={"#B4B4B4"}
                        value={amount}
                        placeholder="0"
                        keyboardType="numeric"
                    />
                    <Text style={[styles.bodyTextWhite, styles.textFix]}>Lainattavissa {item.Maara} kpl</Text>
                </View>
                <View style={styles.center}>
                    <ThemeButton color="#F4247C" text="Lainaa" onPress={handleNewLoan} />
                </View>
            </View>
        </View>
    );
}