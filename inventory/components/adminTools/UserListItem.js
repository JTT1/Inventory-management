import { View, Platform, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { AdminStyles as styles } from './AdminStyles';
import { Feather } from '@expo/vector-icons';
import ThemeButton from '../testing_field/ThemeButton';
import { updateUserInfo } from '../../helpers/firebaseFunctions';
import { Picker } from '@react-native-picker/picker';

const UserListItem = ({ user }) => {
    const [firstName, setFirstName] = useState(user.etunimi);
    const [lastName, setLastName] = useState(user.sukunimi);
    const [role, setRole] = useState(user.rooli);
    const [email, setEmail] = useState(user.email);
    const [userSelected, setUserSelected] = useState(false);

    let device = "";
    if (Platform.OS == "android") {
        device = "android";
    } else {
        device = "ios";
    }

    const handleUserSelect = () => {
        setUserSelected(true);
        return
    }

    const handleUserUpdate = async () => {
        setUserSelected(false)
        const updatedUser = {
            ID: user.ID,
            etunimi: firstName,
            sukunimi: lastName,
            rooli: role,
            email: email,
        }
        await updateUserInfo(updatedUser)
            .catch(() => {
                return Alert.alert('Virhe', 'Tietoja ei voitu päivittää.');
            })
        return;
    }

    return (
            <TouchableOpacity onPress={handleUserSelect}>
            <View style={[styles.flexRow, styles.stretch, styles.trayItem, styles.flexBetween]}>
                <Text style={[styles.h4, styles.userName]}>{user.etunimi} {user.sukunimi}</Text>
                <View style={styles.flexRow}>
                    <Feather name="user" size={20} color="white" />
            <Text style={styles.bodyTextWhite}>{user.rooli}</Text>
                </View>
            <Modal
                    style={[styles.centerHorizontal]}
                isVisible={userSelected}
                onBackButtonPress={() => setUserSelected(false)}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
                >
                    <View style={[styles.modalContentContainer]}>
                        <Text style={styles.bodyTextWhite}>Sähköposti</Text>
                        <TextInput
                            style={[styles.bodyTextWhite, styles.TextInput, { alignSelf: 'center', paddingLeft: 15, width: "100%" }]}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    <Text style={styles.bodyTextWhite}>Etunimi</Text>
                    <TextInput
                            style={[styles.bodyTextWhite, styles.TextInput, { alignSelf: 'center', paddingLeft: 15, width: "100%" }]}
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                        />
                        <Text style={styles.bodyTextWhite}>Sukunimi</Text>
                        <TextInput
                            style={[styles.bodyTextWhite, styles.TextInput, { alignSelf: 'center', paddingLeft: 15, width: "100%" }]}
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                        />
                        <Text style={styles.bodyTextWhite}>Rooli</Text>
                        <View style={[styles.projectView]}>
                            {device == "android" ? <Picker
                                style={[styles.projectDropDownAndroid, styles.bodyTextWhite]}
                                selectedValue={role}
                                onValueChange={(itemValue) => setRole(itemValue)}>
                                <Picker.Item value={'admin'} label={'Admin'} />
                                <Picker.Item value={'user'} label={'Käyttäjä'} />
                            </Picker>
                                : <Picker
                                    style={[styles.projectDropDownIos, styles.bodyTextWhite]}
                                    selectedValue={role}
                                    onValueChange={(itemValue) => setRole(itemValue)}>
                                    <Picker.Item value={'admin'} label={'Admin'} />
                                    <Picker.Item value={'user'} label={'Käyttäjä'} />
                                </Picker>}
                        </View>
                    </View>
                    <ThemeButton color="#F4247C" width="small" text="Tallenna" onPress={handleUserUpdate} />
            </Modal>
        </View>
        </TouchableOpacity>
    )
}

export default UserListItem