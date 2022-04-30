import React, { useContext, useState, useEffect } from "react";
import { Text, View, TextInput, Alert, Platform, SafeAreaView } from 'react-native';
import { componentStyles as styles } from './componentStyles';
import ThemeButton from '../testing_field/ThemeButton';
import { createNewLoan, fetchProjects, updateItemAmount, updateProjects } from '../../helpers/firebaseFunctions';
import { UserContext } from '../context/userContext.js';
import {Picker} from '@react-native-picker/picker';
import uuid from "react-uuid";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SimpleLineIcons } from '@expo/vector-icons';



export default function Home({ navigation, route }) {
    const [amount, setAmount] = useState('');
    const [projects, setProjects] = useState([]);
    const [visible, setVisible] = useState(false);
    const [other, setOther] = useState('');
    const [selectedProject, setSelectedProject] = useState();
    const { user } = useContext(UserContext);
    const userId = user.ID;
    const userEmail = user.email;
    let device = "";
    const item = route?.params.item;
    let inputDisabledState = item.Maara == 0 ? true : false;


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
                        setSelectedProject(res[0]);
                    } else {
                        Alert.alert('Virhe', 'Projekteja ei pystytty hakemaan!');
                    }
                });
        })();
    }, []);


    useEffect(() => {
        if (selectedProject == 'Muu') {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [selectedProject])


    const handleNewLoan = async () => {
        if (item.Maara == 0) {
            return Alert.alert('', 'Ei lainattavissa.')
        }
        if (Number(amount) < 1) {
            return Alert.alert('', 'Valitse vähintään yksi kappale lainattavaksi.')
        } else if (Number(amount) > item.Maara) {
            return Alert.alert('', 'Tarkista lainattava määrä.')
        }

        let projectName = selectedProject;

        let removeFromInventory = {
            ID: item.ID,
            maara: Number(amount)
        }
        await updateItemAmount(removeFromInventory, { add: false });

        if (visible) {
            let tempProjects = [...projects];
            tempProjects.push(other);
            projectName = other;
            try {
                await updateProjects(tempProjects);
            } catch (error) {
                return Alert.alert('Virhe', error.message);
            }
        } 

        const newLoanData = {
            komponenttiID: item.ID,
            komponentti: item.Nimike,
            lainattuMaara: Number(amount),
            projekti: projectName,
            userID: userId,
            userEmail: userEmail
        };
        
        await createNewLoan(newLoanData)
            .then((res) => {
            if (res.length > 0) {
                return Alert.alert('Lainaus epäonnistui', res)
            } else {
                setAmount('');
                navigation.navigate('Vahvistus', {
                    returnLoan: false
                });
            }
        });
    };

    const pickerItems = projects.map((project) => {
        return <Picker.Item key={uuid()} label={project} value={project} />
    });

    return (
        <SafeAreaView style={[styles.center]}>
            <KeyboardAwareScrollView>
            <View>
                <View style={[styles.background, styles.itemInfo, styles.boxShadow]}>
                        <View style={[styles.flexRow, styles.flexBetween]}>
                            <Text style={[styles.h1, styles.marginFix, { alignSelf: 'flex-start', marginBottom: 20, color: styles.bodyTextCyan.color }]}>
                                {item.Nimike}
                            </Text>
                        </View>
                        {
                            item.Lisatietoa.length > 0 &&
                            <View>
                                <Text style={[styles.h3, styles.marginFix]}>Lisätiedot</Text>
                            <Text style={[styles.bodyTextWhite, styles.marginFix]}>{item.Lisatietoa}</Text>
                            </View>
                        }
                        <View style={[styles.flexRow, styles.componentLocation, styles.flexBetween]}>
                            <View style={[styles.flexRow]}>
                                <SimpleLineIcons name="drawer" size={30} color="white" style={{ marginRight: 5 }} />
                                <Text style={[styles.h4, { marginRight: 15 }]}>
                                    {item.Tarjotin}
                                </Text>
                            </View>
                            <Text style={[styles.h4]}>{item.Sijainti}</Text>
                        </View>
                </View>
                <Text style={[styles.h2, styles.marginFix]}>Projekti, jolle lainataan:</Text>
                <View style={[styles.projectView]}>
                {device == "android" ? <Picker
                    style= {[styles.projectDropDownAndroid, styles.bodyTextWhite]}
                    selectedValue={selectedProject}
                            enabled={!inputDisabledState}
                            onValueChange={(itemValue) => setSelectedProject(itemValue)}>
                            {
                                item.Maara == 0
                                    ? <Picker.Item label="" value={null} />

                                    :
                                    pickerItems
                            }
                            <Picker.Item label='Muu' value='Muu' />
                        </Picker> 

                            // iOS picker
                            : <Picker
                                style={[styles.projectDropDownIos, styles.bodyTextWhite]}
                                selectedValue={selectedProject}
                                onValueChange={(itemValue) => setSelectedProject(itemValue)}>
                                {pickerItems}
                                <Picker.Item label='Muu' value='Muu' />
                            </Picker>}

                    <View style={styles.addComponent}>
                        {/*Here we will return the view when state is true 
                        and will return false if state is false*/}
                            {visible &&
                        <TextInput
                            style={styles.TextInput}
                            placeholderTextColor="white"
                            placeholder="Projektin nimi"
                            onChangeText={setOther}
                        />
                            }
                        </View>
                    </View>
                <Text style={[styles.h2, styles.marginFix]}>Lainattava määrä:</Text>
                    <View style={[styles.flexRow, styles.centerVertical]}>
                    <TextInput
                        style={[styles.input2]}
                        onChangeText={setAmount}
                        placeholderTextColor={"#B4B4B4"}
                        value={amount}
                            editable={!inputDisabledState}
                        placeholder="0"
                        keyboardType="numeric"
                    />
                    <Text style={[styles.bodyTextWhite, styles.textFix]}>Lainattavissa {item.Maara} kpl</Text>
                </View>
                    <ThemeButton color="#F4247C" text="Lainaa" onPress={handleNewLoan} style={{ marginBottom: 20 }} />
            </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}