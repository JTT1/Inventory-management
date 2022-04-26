import React, { useContext, useState, useEffect } from "react";
import { Text, View, TextInput, Alert, Platform, SafeAreaView } from 'react-native';
import { componentStyles as styles } from './componentStyles';
import ThemeButton from '../testing_field/ThemeButton';
import { createNewLoan, fetchProjects } from '../../helpers/firebaseFunctions';
import { UserContext } from '../context/userContext.js';
import {Picker} from '@react-native-picker/picker';
import uuid from "react-uuid";
import { PROJECTS_REF, db } from "../../firebase/Config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Home({ navigation, route }) {
    const [text, setText] = useState(null);
    const [amount, setAmount] = useState(null);
    const { user } = useContext(UserContext);
    const userId = user.ID
    const userEmail = user.email;
    let device = "";
    const [projects, setProjects] = useState([])
    const [visible, setVisible] = useState(false);
    const [other, setOther] = useState('');

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
                        setSelectedProject(res[0]);
                    } else {
                        Alert.alert('Virhe', 'Projekteja ei pystytty hakemaan!');
                    }
                });
        })();
    }, []);



    const item = route?.params.item;

    const handleNewLoan = async () => {
        let projectName = selectedProject

        if (visible) {
            let tempProjects = [...projects]
            tempProjects.push(other)
            projectName = other
            db.ref(PROJECTS_REF).update({
                ryhmat: tempProjects
              })
        } 

        const newLoanData = {
            komponentti: item.Nimike,
            lainattuMaara: Number(amount),
            projekti: projectName,
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

    console.log(selectedProject + " valittu projekti");

    useEffect(() => {
        if (selectedProject == 'Muu') {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [selectedProject])
    

    return (
        <SafeAreaView style={styles.center}>
            <KeyboardAwareScrollView>
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
                        {pickerItems}
                        <Picker.Item label='Muu' value='Muu' />
               </Picker> 

                    

               : <Picker
               style= {[styles.projectDropDownIos, styles.bodyTextWhite]}
               selectedValue={selectedProject}
               onValueChange={(itemValue, itemIndex) => setSelectedProject(itemValue)}>
                   {pickerItems}
                   <Picker.Item label='Muu' value='Muu' />
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
                        />
                        ) : <React.Fragment/>}
                        
                    </View>

                    {/* Komponentin toggle-toiminto */}

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
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );

}