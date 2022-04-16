import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle'

export const confirmStyles = StyleSheet.create({
    ...styles,
    confirmScreenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    iconContainer: {
        // marginTop: 20,
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
    },
    checkMark: {
        position: 'relative',
        paddingBottom: 50,
        marginLeft: 50,
    },
    confirmationText: {
        marginBottom: 30,
    }
});