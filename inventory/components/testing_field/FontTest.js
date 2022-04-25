import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { styles } from '../styles/AppRootStyle.js';
import bgImage from '../assets/images/login-screen-background.png'

const FontTest = () => {
    return (
        <View>
            <ImageBackground source={bgImage} style={styles.backgroundImage} resizeMode="cover">
                <Text style={styles.headingBold}>Quicksand 700</Text>
                <Text style={styles.heading}>Quicksand 600</Text>
                <Text style={styles.bodyTextMedium}>Quicksand 500</Text>
                <Text style={styles.bodyText}>Quicksand 400</Text>
            </ImageBackground>

        </View>
    )
}

export default FontTest