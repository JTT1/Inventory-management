import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle'

export const confirmStyles = StyleSheet.create({
    ...styles,
    confirmScreenContainer: {
        alignItems: 'center',
    },

    iconContainer: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -10,
    },
    iconCircle: {
        position: 'absolute',
        borderWidth: 15,
        borderColor: 'white',
        borderRadius: 150,
        width: 200,
        height: 200,
        marginLeft: -10
    },
    checkMark: {
        position: 'relative',
        paddingBottom: 50,
        marginLeft: 50,
    },
    confirmationText: {
        marginBottom: 50,
    }
});