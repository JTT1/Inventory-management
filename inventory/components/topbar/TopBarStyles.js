import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle';

export const topBarStyles = StyleSheet.create({
    ...styles,
    topBarContainer: {
        height: 75,
        marginHorizontal: 10,
        marginTop: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#96E9CB',
        borderRadius: 10,
        shadowColor: '#000000',
        elevation: 20,
        shadowOffset: {
            height: 4,
            width: 0
        },
    },
    avatar: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    imgContainer: {
        marginLeft: 5,
        borderRadius: 26,
        borderWidth: 2,
        borderColor: '#1DFFBB',
        shadowColor: '#000000',
        elevation: 5,
        shadowOffset: {
            height: 10,
            width: 10
        },
    },
    userImg: {
        borderRadius: 26,
        width: 50,
        height: 50,
    },

    iconShadow: {
        textShadowOffset:
            { height: 4, width: 0 },
        textShadowColor: '#5E5A86',
        textShadowRadius: 15,
    }
});