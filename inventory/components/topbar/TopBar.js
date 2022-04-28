import { View, Text, Image, BackHandler, TouchableOpacity } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { topBarStyles as styles } from './TopBarStyles.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from '../context/userContext';
import { logout } from '../../helpers/firebaseFunctions';

const TopBar = (props) => {
    const { user } = useContext(UserContext);
    const currentScreen = props.route.name;

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', close);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', close);
        }
    }, []);

    const close = () => {
        props.route.name != 'Koti' && props.navigation.goBack(null);
        return true;
    }

    const handleDrawerOpen = async () => {
        return await logout()
            .then(() => {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Loading' }]
                });
            })
    }

    return (
        <View style={styles.topBarContainer}>
            <View style={[styles.flexRow, styles.centerVertical]}>
                {currentScreen == 'Koti'
                    ? <MaterialCommunityIcons style={styles.iconShadow} name="home" size={45} color="#5E5A86" />
                    : <TouchableOpacity onPress={close}>
                    <MaterialCommunityIcons style={styles.iconShadow} name="arrow-left" size={45} color="#5E5A86" />
                </TouchableOpacity>
                }
                <Text style={[styles.h2, { marginLeft: 10, color: styles.bodyTextDark.color }]}>
                    {currentScreen}
                </Text>
            </View>
            <View style={styles.avatar}>
                <Text style={styles.bodyTextDark}>{user.etunimi}</Text>
                {/* Tästä toggle drawer, josta näkee käyttäjäprofiilin */}
                <TouchableOpacity onPress={handleDrawerOpen} style={styles.imgContainer}>

                    <Image source={{ uri: "https://picsum.photos/200" }} style={styles.userImg} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TopBar;