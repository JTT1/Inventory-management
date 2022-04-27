import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';

const UserListItem = ({ user, styles }) => {
    const [fName, setFname] = useState(user.etunimi);
    const [userSelected, setUserSelected] = useState(false);

    const handleUserSelect = () => {
        setUserSelected(true);
        return
    }


    return (
        <View style={[styles.flexRow, styles.stretch]}>
            <TouchableOpacity onPress={handleUserSelect}>
                <Text style={styles.bodyTextWhite}>Nimi: {user.etunimi} {user.sukunimi}</Text>
            </TouchableOpacity>
            <Text style={styles.bodyTextWhite}>{user.rooli}</Text>
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
                    <Text style={styles.bodyTextWhite}>Etunimi</Text>
                    <TextInput
                        style={[styles.bodyTextWhite, styles.h3, styles.TextInput, { alignSelf: 'center' }]}
                        value={fName}
                        onChangeText={(text) => setFname(text)}
                    />
                </View>


            </Modal>
        </View>
    )
}

export default UserListItem