import { StyleSheet, Dimensions } from 'react-native';
import { styles } from '../../styles/AppRootStyle';


export const scannerStyles = StyleSheet.create({
    ...styles,
    QRcontainer: {
        flex: 1,
        backgroundColor: '#2C2A4C',
    },
    camera: {
        flex: 1,
    },

    scanResultsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#605A91',
        backgroundColor: '#393663',
        marginVertical: 5,
        maxHeight: "55%",
        color: 'white',
    },
    trayItem: {
        padding: 10,
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        borderColor: '#605A91',
        borderTopWidth: 2,
    },
});