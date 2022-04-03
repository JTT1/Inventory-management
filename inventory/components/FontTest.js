import { View, Text } from 'react-native';
import React from 'react';
import { styles } from '../styles/app-root-style.js';

const FontTest = () => {
    return (
        <View>
            <Text style={styles.headingBold}>Quicksand 700</Text>
            <Text style={styles.heading}>Quicksand 600</Text>
            <Text style={styles.bodyTextMedium}>Quicksand 500</Text>
            <Text style={styles.bodyText}>Quicksand 400</Text>
        </View>
    )
}

export default FontTest