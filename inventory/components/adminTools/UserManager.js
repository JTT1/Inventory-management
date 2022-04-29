import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AdminStyles as styles } from './AdminStyles';
import { fetchAllUsers } from '../../helpers/firebaseFunctions';
import UserListItem from './UserListItem';

const UserManager = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            fetchAllUsers()
                .then((res) => {
                    setUsers(res);
                    setLoaded(true);
                })
        })();
    }, [])

    const renderUserList = users.map((user) => {
        return <UserListItem key={user.ID} user={user} />
    });

    return (
        <View style={[styles.container, styles.centerVertical]}>
            <Text style={[styles.h2, styles.selfcenterVertical]}>
                Käyttäjähallinta
            </Text>
            {loaded ? 
            <View style={[styles.userListContainer, styles.stretch, styles.boxShadow]}>
                <ScrollView>
                    {renderUserList}
                </ScrollView>
            </View>
                : <ActivityIndicator size={100} color="#1DFFBB" />}
        </View>
    )
}

export default UserManager