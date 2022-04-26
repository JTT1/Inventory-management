import React, { useContext, useState, useEffect } from "react";
import { Text, View, TextInput, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { componentStyles as styles } from './componentStyles';
import ThemeButton from '../testing_field/ThemeButton';
import { createNewLoan, fetchProjects } from '../../helpers/firebaseFunctions';
import { UserContext } from '../context/userContext.js';
import {Picker} from '@react-native-picker/picker';
import uuid from "react-uuid";

export default function Home({ navigation, route }) {
    const [text, setText] = useState(null);
    const [amount, setAmount] = useState(null);
    const { user } = useContext(UserContext);
    const userId = user.ID
    const userEmail = user.email;
    let device = "";
    const [projects, setProjects] = useState([])

    const [selectedProject, setSelectedProject] = useState();

    if (Platform.OS == 'android') {
        device = "android"
    } else {
        device = "ios"
    }

    useEffect(() => {
        (async () => {
            await fetchProjects()
                .then((res) => {
                    if (res.length > 0) {
                        setProjects(res);
                    } else {
                        Alert.alert('Virhe', 'Projekteja ei pystytty hakemaan!');
                    }
                });
        })();
    }, []);



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

    const pickerItems = projects.map((project) => {
        return <Picker.Item key={uuid()} label={project} value={project} />
    })

    console.log(pickerItems);

    return (
        <KeyboardAvoidingView style={styles.center}>
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
                {device == "android" ? <Picker
                    style= {[styles.projectDropDownAndroid, styles.bodyTextWhite]}
                    selectedValue={selectedProject}
                    onValueChange={(itemValue, itemIndex) => setSelectedProject(itemValue)}>

                    {/* <Picker.Item label="TUKE 1" value="TUKE 1" />
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
                    <Picker.Item label="MUU" value="MUU" /> */}

               </Picker> 
               : <Picker
               style= {[styles.projectDropDownIos, styles.bodyTextWhite]}
               selectedValue={selectedProject}
               onValueChange={(itemValue, itemIndex) => setSelectedProject(itemValue)}>

               {/* <Picker.Item label="TUKE 1" value="TUKE 1" />
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
               <Picker.Item label="MUU" value="MUU" /> */}

          </Picker> }

          <View>
          <ThemeButton color="#F4247C" text="Testaa" onPress={fetchProjects} />
          </View>
                   
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
                        placeholder="0"
                        keyboardType="numeric"
                    />
                    <Text style={[styles.bodyTextWhite, styles.textFix]}>Lainattavissa {item.Maara} kpl</Text>
                </View>
                <View style={styles.center}>
                    <ThemeButton color="#F4247C" text="Lainaa" onPress={handleNewLoan} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );

}