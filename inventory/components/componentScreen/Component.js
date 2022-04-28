import React, { useContext, useState, useEffect } from "react";
import { Text, View, TextInput, Alert, Platform, SafeAreaView } from 'react-native';
import { componentStyles as styles } from './componentStyles';
import ThemeButton from '../testing_field/ThemeButton';
import { createNewLoan, fetchProjects, updateProjects } from '../../helpers/firebaseFunctions';
import { UserContext } from '../context/userContext.js';
import {Picker} from '@react-native-picker/picker';
import uuid from "react-uuid";
import { PROJECTS_REF, db } from "../../firebase/Config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
        if (Number(amount) < 1) {
            return Alert.alert('', 'Valitse vähintään yksi kappale lainattavaksi.')
        }
        let projectName = selectedProject;

        if (visible) {
            let tempProjects = [...projects];
            tempProjects.push(other);
            projectName = other;

            await updateProjects(tempProjects);
            db.ref(PROJECTS_REF).update({
                ryhmat: tempProjects
            });
        } 

        const newLoanData = {
            komponentti: item.Nimike,
            lainattuMaara: Number(amount),
            projekti: projectName,
            userID: userId,
            userEmail: userEmail
        };
        
        await createNewLoan(newLoanData).then((res) => {
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
        <SafeAreaView style={styles.center}>
            <KeyboardAwareScrollView>
            <View>
                <View style={[styles.background, styles.itemInfo, styles.boxShadow]}>
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
                            onValueChange={(itemValue) => setSelectedProject(itemValue)}>
                        {pickerItems}
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
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}