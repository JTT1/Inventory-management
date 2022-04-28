import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#2C2A4C',
    },
    header: {
        backgroundColor: '#2C2A4C',
    },
    themeRed: {
        backgroundColor: '#F4247C',
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
    bodyTextCyan: {
        fontFamily: 'Quicksand500',
        fontSize: 16,
        color: '#6EEEFF',
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
    bodyTextYellow: {
        fontFamily: 'Quicksand500',
        fontSize: 16,
        color: "#FFCB20",
    },
    upperCase: {
        textTransform: 'uppercase',
    },
    backgroundImage: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    flexCol: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 1,
    }, 
    flexBetween: {
        justifyContent: 'space-between',
    },
    stretch: {
        alignSelf: 'stretch',
    },
    centerHorizontal: {
        alignItems: 'center'
    },
    centerVertical: {
        justifyContent: 'center'
    },
    selfCenterHorizontal: {
        alignSelf: 'center'
    },

    button: {
        marginTop: 25,
        width: 276,
        height: 56,
        borderRadius: 28, // height / 2
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        textTransform: 'uppercase',
        backgroundColor: '#F4247C',
        color: 'white',
    },
    buttonSmaller: {
        width: 230,
    },
    buttonDisabled: {
        backgroundColor: 'black'
    },
    TextInput: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 40,
        paddingRight: 9,
        borderRadius: 20,
        backgroundColor: "rgba(143,138,191,0.5)",
        width: 270,
        height: 40,
        color: 'white',
        marginTop: "2%"
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: "center",
    },
    inputIcon: {
        elevation: 1,
        position: 'absolute',
        paddingLeft: 10
    },
    testi1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: 296,
        height: 80,
      },
      testi2: {
        fontSize: 18,
          fontFamily: "Quicksand500",
        fontWeight: "700",
        color: "rgba(255, 255, 255, 1)",
        marginRight: 20,
      },
      testi3: {
        width: 80,
          height: 80,
    },
    registerCenter: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#2C2A4C',
        color: 'white',
        alignItems: "center",
    },
    registerScroll: {
        paddingTop: "15%",
        paddingBottom: "15%",
        alignItems: "center",
    },
    inputView: {
        padding: 10,
    },
    registerBottom: {
        paddingTop: "5%",
        alignItems: "center"
    }, 
    registerScroll: {
        paddingTop: "15%",
        paddingBottom: "15%",
        alignItems: "center",
    },
    inputView: {
        padding: 10,
    },
    registerBottom: {
        paddingTop: "5%",
        alignItems: "center"
    },
    largeTextInput: {
        marginTop: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: "rgba(143,138,191,0.5)",
        width: 270,
        height: 200,
        color: 'white'
    },
    addComponentButton: {
        marginBottom: "10%"
    },
    addComponentBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "10%",
        paddingTop: "10%",
        backgroundColor: '#2C2A4C',
        flex: 1,
    },
    addComponentScroll: {
        flex: 1,
        backgroundColor: '#2C2A4C',
        paddingLeft: "14%",
        paddingRight: "14%",
    },
    trayList: {
        width: "80%",
        alignItems: "center"
    },
    screen: {
        paddingTop: "40%",
        flex: 1,
        backgroundColor: '#2C2A4C',
        alignContent: "center",
    }
});

