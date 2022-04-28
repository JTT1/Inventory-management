import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { AdminStyles as styles } from './AdminStyles';
import { Feather } from '@expo/vector-icons';
import ThemeButton from '../testing_field/ThemeButton';

const UserListItem = ({ user }) => {
    const [firstName, setFirstName] = useState(user.etunimi);
    const [lastName, setLastName] = useState(user.sukunimi);
    const [userSelected, setUserSelected] = useState(false);
    const [role, setRole] = useState(user.rooli);
    const [email, setEmail] = useState(user.email);

    const handleUserSelect = () => {
        setUserSelected(true);
        return
    }

    const handleUserChanges = () => {
        console.log('update firebase')
        return
    }


    return (
            <TouchableOpacity onPress={handleUserSelect}>
            <View style={[styles.flexRow, styles.stretch, styles.trayItem, styles.flexBetween]}>
                <Text style={[styles.bodyTextCyan, styles.h4]}>{user.etunimi} {user.sukunimi}</Text>
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
                <View>
                        <Text style={styles.bodyTextWhite}>Sähköposti</Text>
                        <TextInput
                            style={[styles.bodyTextWhite, styles.h3, styles.TextInput, { alignSelf: 'center' }]}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    <Text style={styles.bodyTextWhite}>Etunimi</Text>
                    <TextInput
                        style={[styles.bodyTextWhite, styles.h3, styles.TextInput, { alignSelf: 'center' }]}
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                        />
                        <Text style={styles.bodyTextWhite}>Sukunimi</Text>
                        <TextInput
                            style={[styles.bodyTextWhite, styles.h3, styles.TextInput, { alignSelf: 'center' }]}
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                        />
                        <Text style={styles.bodyTextWhite}>Rooli</Text>
                        <TextInput
                            style={[styles.bodyTextWhite, styles.h3, styles.TextInput, { alignSelf: 'center' }]}
                            value={role}
                            onChangeText={(text) => setRole(text)}
                        />
                    </View>
                    <ThemeButton color="#F4247C" width="small" text="Tallenna" onPress={handleUserChanges} />
            </Modal>
        </View>
        </TouchableOpacity>
    )
}

export default UserListItem