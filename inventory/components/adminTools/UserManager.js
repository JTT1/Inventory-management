import { ScrollView, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AdminStyles as styles } from './AdminStyles';
import { fetchAllUsers } from '../../helpers/firebaseFunctions';
import UserListItem from './UserListItem';

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            fetchAllUsers(true)
                .then((res) => {
                    setUsers(res);
                    setLoaded(true);
                });
        })();
    }, [])

    const renderUserList = users.map((user) => {
        return <UserListItem key={user.ID} user={user} />
    });

    return (
        <View style={[styles.container, styles.centerHorizontal]}>
            <Text style={[styles.h2, styles.selfCenterHorizontal]}>
                Käyttäjähallinta
            </Text>
            <View style={[styles.userListContainer, styles.stretch]}>

                <ScrollView>
                    {renderUserList}
                </ScrollView>

            </View>
        </View>
    )
}

export default UserManager