import React, { useContext } from "react";
import { Text, View, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { componentStyles as styles } from './componentStyles';
import ThemeButton from '../testing_field/ThemeButton';
import { createNewLoan } from '../../helpers/firebaseFunctions';
import { UserContext } from '../context/userContext.js';
import {Picker} from '@react-native-picker/picker';

export default function Home({ navigation, route }) {
    const [text, setText] = useState(null);
    const [amount, setAmount] = useState(null);
    const user = useContext(UserContext);
    const [userId] = Object.keys(user)

    const [selectedProject, setSelectedProject] = useState();

    const item = route?.params.item;
    // const item = {
    //     ID: 66,
    //     Lisatietoa: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ornare eu leo sodales vulputate. Donec interdum semper ex, sit amet euismod arcu ultricies nec. Cras auctor, enim id volutpat mollis, nibh felis mollis felis, sit amet tincidunt purus enim at mauris.",
    //     Maara: 25,
    //     Nimike: "Virtausmittari",
    //     Sijainti: "",
    //     Tarjotin: "",
    // }

    const handleNewLoan = () => {
        const newLoanData = {
            komponentti: item.Nimike,
            lainattuMaara: amount,
            projekti: text,
            userID: userId,
        }
        createNewLoan(newLoanData).then((res) => {
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
                <View style={[styles.projectView]}>
                <Picker
                    style= {[styles.projectDropDown, styles.bodyTextWhite]}
                    selectedValue={selectedProject}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedProject(itemValue)
                    }>
                    
                    <Picker.Item label="TUKE 1" value="TUKE 1" />
                    <Picker.Item label="TUKE 2" value="TUKE 2" />
                    <Picker.Item label="TUKE 3" value="TUKE 3" />
                    <Picker.Item label="TUKE 4" value="TUKE 4" />
                    <Picker.Item label="TUKE 5" value="TUKE 5" />
                    <Picker.Item label="TUKE 6" value="TUKE 6" />
                    <Picker.Item label="TUKE 7" value="TUKE 7" />
                    <Picker.Item label="TUKE 8" value="TUKE 8" />
                    <Picker.Item label="TUKE 9" value="TUKE 9" />
                    <Picker.Item label="TUKE 10" value="TUKE 10" />
                    <Picker.Item label="PROHA 1" value="PROHA 1" />
                    <Picker.Item label="PROHA 2" value="PROHA 2" />
                    <Picker.Item label="PROHA 3" value="PROHA 3" />
                    <Picker.Item label="PROHA 4" value="PROHA 4" />
                    <Picker.Item label="PROHA 5" value="PROHA 5" />
                    <Picker.Item label="MUU" value="MUU" />

                </Picker>   
                </View>
                {/* <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    placeholderTextColor={"#B4B4B4"}
                    value={text}
                    placeholder="Projektin nimi"
                /> */}
                <Text style={[styles.h2, styles.marginFix]}>Lainattava määrä:</Text>
                <View style={[styles.flexRow, styles.centerHorizontal]}>
                    <TextInput
                        style={[styles.input2]}
                        onChangeText={setAmount}
                        placeholderTextColor={"#B4B4B4"}
                        value={amount}
                        placeholder="1"
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