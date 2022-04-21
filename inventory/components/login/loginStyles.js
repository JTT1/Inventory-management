import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle';

export const loginStyles = StyleSheet.create({
    ...styles,

    loginBox: {
        backgroundColor: "rgba(94, 90, 134, 0.9)",
        borderWidth: 1,
        borderColor: "#8F8ABF",
        borderRadius: 20,
        height: "80%",
        width: "90%"
    },
    marginFix: {
        marginBottom: 20
    },
    textFix: {
        textAlign: "left",
        width: "80%"
    },
    
});