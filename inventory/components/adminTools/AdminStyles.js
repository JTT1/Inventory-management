
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
        maxHeight: '55%',
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
        backgroundColor: 'rgba(57, 54, 99, 0.85)',
        width: '95%',
        borderRadius: 15,
        padding: 15,
        borderColor: '#8F8ABF',
        borderWidth: 2
    },
    headingMargin: {
        marginBottom: 10,
    },
    adminTextInput: {
        maxHeight: 40,
        paddingLeft: 15,
        width: '100%',
    },
    projectView: {
        width: '85%',
        borderRadius: 12,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: 'rgba(180, 180, 180, 0.2)',
        overflow: 'hidden',
    },
    projectDropDownAndroid: {
        borderRadius: 30,
        backgroundColor: 'rgba(180, 180, 180, 0.1)',
        padding: 10,
    },
    projectDropDownIos: {
        width: '85%',
        height: 200,
        borderRadius: 30,
        backgroundColor: 'rgba(180, 180, 180, 0.1)',
        padding: 10,
    },
    userIcon: {
        marginRight: 5,
    },
});