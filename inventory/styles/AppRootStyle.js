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
        marginVertical: 10,
        color: 'white',

    },
    h2: {
        fontFamily: 'Quicksand700',
        fontSize: 24,
        color: 'white',

    },
    h3: {
        fontFamily: 'Quicksand700',
        fontSize: 20,
        color: 'white',

    },
    h4: {
        fontFamily: 'Quicksand700',
        fontSize: 18,
        color: 'white',

    },
    h5: {
        fontFamily: 'Quicksand700',
        fontSize: 16,
        color: 'white',
    },
    bodyTextDark: {
        fontFamily: 'Quicksand500',
        fontSize: 16,
        color: '#393663',
    },
    bodyTextWhite: {
        fontFamily: 'Quicksand500',
        fontSize: 16,
        color: 'white',
    },
    bodyTextGreen: {
        fontFamily: 'Quicksand500',
        fontSize: 16,
        color: "#96E9CB"
    },
    bodyTextRed: {
        fontFamily: 'Quicksand500',
        fontSize: 16,
        color: "#F4247C",
    },
    upperCase: {
        textTransform: 'uppercase',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    boxShadow: {
        shadowColor: '#000',
        elevation: 15,
    },
    flexBox: {
        flex: 1,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 1,
    },
    flexBetween: {
        justifyContent: 'space-between',
    },
    stretch: {
        alignSelf: 'stretch',
    },

    button: {
        marginTop: 25,
        width: 276,
        height: 56,
        borderRadius: 28, // height / 2
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'uppercase',
        backgroundColor: '#F4247C',
        color: 'white',
    },
    buttonSmaller: {
        width: 230,
    }
});

