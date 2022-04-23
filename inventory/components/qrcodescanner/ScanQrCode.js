import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { scannerStyles as styles } from './ScannerStyle';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Modal from 'react-native-modal';

const ScanQrCode = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleScannedCode = ({ data }) => {
        setScanned(true);
        navigation.navigate('Laatikko', { scanResult: data });
    };
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.QRcontainer}>
            <Modal
                style={[styles.centerHorizontal]}
                isVisible={true}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
            >
            <BarCodeScanner
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    onBarCodeScanned={scanned ? undefined : handleScannedCode}
                    style={[StyleSheet.absoluteFillObject]}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </Modal>
        </View>
    );
}

export default ScanQrCode