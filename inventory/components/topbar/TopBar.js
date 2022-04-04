import { View, Text, Image } from 'react-native'
import React from 'react'
import { topBarStyles as styles } from './TopBarStyles.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TopBar = () => {
    return (
        <View style={styles.topBarContainer}>
            {/* Tähän routing edelliseen komponenttiin */}
            <View>
                <MaterialCommunityIcons style={styles.iconShadow} name="arrow-left" size={40} color="#5E5A86" />
            </View>
            <View>
                <Text style={styles.bodyTextDark}>
                    center
                </Text>
            </View>
            <View style={styles.avatar}>
                <Text style={styles.bodyTextDark}>User</Text>

                {/* Tästä toggle drawer, josta näkee käyttäjäprofiilin */}
                <View style={styles.imgContainer}>
                    <Image source={{ uri: "https://picsum.photos/200" }} style={styles.userImg} />
                </View>
            </View>

        </View>
    )
}

export default TopBar