
import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle';


export const AdminStyles = StyleSheet.create({
    ...styles,
    userListContainer: {
        justifyContent: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#605A91',
        backgroundColor: '#393663',
        marginVertical: 5,
        maxHeight: "55%",
        color: 'white',
    },
    userName: {
        color: '#6EEEFF',
    },
    trayItem: {
        padding: 15,
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        borderColor: '#605A91',
        borderTopWidth: 2,
    },
    modalContentContainer: {
        backgroundColor: "rgba(57, 54, 99, 0.95)",
        width: "85%",
        height: 340,
        borderRadius: 15,
        padding: 15,
    },
});