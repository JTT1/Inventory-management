import React, { useState, useEffect } from 'react';
import { Text, View, BackHandler } from 'react-native';
import { scannerStyles as styles } from './ScannerStyle';
import { Camera } from 'expo-camera';

const ScanQrCode = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [scanned, setScanned] = useState(false);
    const isFocused = navigation.isFocused();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', close);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', close);
        }
    }, []);

    const close = () => {
        navigation.goBack();
        return true
    }

    const handleScannedCode = ({ type, data }) => {
        setScanned(true);
        navigation.pop();
        navigation.navigate('Tulos', { scanResult: data });
    };
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={[styles.QRcontainer]}>
            {isFocused && <Camera
                type={type}
                onBarCodeScanned={handleScannedCode}
                barCodeScannerSettings={{ barCodeTypes: 'qr' }}
                style={[styles.camera]}
            />}
        </View>
    );
}

export default ScanQrCode;