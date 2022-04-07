import { View, Text, Image } from 'react-native'
import React from 'react'
import { topBarStyles as styles } from './TopBarStyles.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TopBar = () => {
    return (
        <View style={styles.topBarContainer}>
            {/* Tähän routing edelliseen komponenttiin */}
            <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons style={styles.iconShadow} name="arrow-left" size={35} color="#5E5A86" />
                <Text style={[styles.h2, { marginLeft: 20, color: styles.bodyTextDark.color, }]}>
                    Route
                </Text>
            </View>
            <View style={styles.avatar}>
                {/* <Text style={styles.bodyTextDark}>User</Text> */}

                {/* Tästä toggle drawer, josta näkee käyttäjäprofiilin */}
                <View style={styles.imgContainer}>
                    <Image source={{ uri: "https://picsum.photos/200" }} style={styles.userImg} />
                </View>
            </View>
        </View>
    )
}

export default TopBar