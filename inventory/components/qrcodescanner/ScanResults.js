import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getTrayItems } from '../../helpers/firebaseFunctions';
import { scannerStyles as styles } from './ScannerStyle';
import TrayListItem from './TrayListItem';
import uuid from 'react-uuid';
import ThemeButton from '../testing_field/ThemeButton';

const ScanResults = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const scanResult = route.params?.scanResult;

    useEffect(() => {
        (async () => {
            await getTrayItems(scanResult)
                .then((res) => {
                    setData(res)
                    setLoaded(true)
                }
                );
        })();
    }, [scanResult])

    const renderItemsList = data.map((item) => <TrayListItem item={item} navigation={navigation} key={uuid()} />)

    return (
        <View style={[styles.container, styles.centerHorizontal]}>
            <Text style={[styles.h2, styles.selfCenterHorizontal]}>
                {scanResult}
            </Text>
            <View style={[styles.scanResultsContainer, styles.stretch]}>
                {loaded ?
                    <ScrollView style={[styles.stretch]}>
                        {renderItemsList}
                    </ScrollView>
                    : <ActivityIndicator size={100} color="#1DFFBB" />
                }
            </View>
            <ThemeButton style={{ marginBottom: 20, }} color="#F4247C" text="Skannaa uudestaan" onPress={() => navigation.navigate('Skannaus')} />
            <ThemeButton style={{ marginBottom: 20, }} color="#F4247C" text="Kotinäkymään" width={'small'} onPress={() => navigation.navigate('Koti')} />
        </View>
    )
}

export default ScanResults