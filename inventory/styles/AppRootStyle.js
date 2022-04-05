import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#2C2A4C',
        color: 'white',
    },
    h1: {
        fontFamily: 'Quicksand700',
        fontSize: 30,
        alignSelf: 'center',
    },
    h2: {
        fontFamily: 'Quicksand700',
        fontSize: 24,
    },
    h3: {
        fontFamily: 'Quicksand700',
        fontSize: 20,
    },
    h4: {
        fontFamily: 'Quicksand700',
        fontSize: 18,
    },
    h5: {
        fontFamily: 'Quicksand700',
        fontSize: 16,
    },
    bodyTextMedium: {
        fontFamily: 'Quicksand500',
        fontSize: 18,
    },
    bodyTextDark: {
        fontFamily: 'Quicksand500',
        fontSize: 16,
        color: '#393663',
    },
    bodyTextWhite: {
        fontFamily: 'Quicksand500',
        fontSize: 16,
        color: '#ffffff',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

});

