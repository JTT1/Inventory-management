import { View, Text, Image, BackHandler, TouchableOpacity } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { topBarStyles as styles } from './TopBarStyles.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from '../context/userContext';

const TopBar = (props) => {
    const user = useContext(UserContext);
    const [key] = Object.keys(user);
    const userDetails = user[key];

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', close);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', close);
        }
    }, []);


    const close = () => {
        props.navigation.goBack(null);
        return true;
    }

    const handleDrawerOpen = () => {
        return
    }

    return (
        <View style={styles.topBarContainer}>
            {/* Tähän routing edelliseen komponenttiin */}
            <View style={[styles.flexRow, styles.centerVertical]}>
                <TouchableOpacity onPress={close}>
                    <MaterialCommunityIcons style={styles.iconShadow} name="arrow-left" size={45} color="#5E5A86" />
                </TouchableOpacity>
                <Text style={[styles.h2, { marginLeft: 10, color: styles.bodyTextDark.color }]}>
                    {props.route.name}
                </Text>
            </View>
            <View style={styles.avatar}>

                {/* <Text style={styles.bodyTextDark}>{userDetails.etunimi} {userDetails.sukunimi}</Text> */}
                {/* Tästä toggle drawer, josta näkee käyttäjäprofiilin */}
                <TouchableOpacity onPress={handleDrawerOpen} style={styles.imgContainer}>

                    <Image source={{ uri: "https://picsum.photos/200" }} style={styles.userImg} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TopBar;