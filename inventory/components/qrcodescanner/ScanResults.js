import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getDrawerByName } from '../../helpers/firebaseFunctions';
import { styles } from '../../styles/AppRootStyle'

const ScanResults = ({ navigation, route }) => {
    const scanResult = route?.params.scanResult;
    console.log(route.params.scanResult)

    useEffect(() => {
        console.log(getDrawerByName(scanResult));
    }, [])

    return (
        <View style={styles.container}>
            <Text>Skannauksen tulos: {scanResult}</Text>
        </View>
    )
}

export default ScanResults