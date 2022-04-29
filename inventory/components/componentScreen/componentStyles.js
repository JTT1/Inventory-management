import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle';

export const componentStyles = StyleSheet.create({
    ...styles,

center: {
        backgroundColor: '#2C2A4C',
        height: "100%"
    },
    background: {
        backgroundColor: 'rgba(57, 54, 99, 1)',
        marginTop: 20,
    marginBottom: 30,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderStyle: "solid",
    borderLeftColor: "#5E5A86",
    borderRightColor: "#5E5A86",
    borderBottomColor: "#5E5A86",
    borderTopColor: "#5E5A86",
    },
flexRow: {
    flexDirection: "row",
    },

    componentLocation: {
        borderTopWidth: 2,
        borderTopColor: "#5E5A86",
        paddingVertical: 10,
        marginHorizontal: 20,
        marginTop: 20,
},

    itemInfo: {
        padding: 10,
    },

input: {
    width: 280,
    height: 55,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(180, 180, 180, 0.1)',
    padding: 10,
    color: 'white',
},

input2: {
    width: 130,
    height: 55,
    padding: 10,
    margin: 10,
    marginLeft: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(180, 180, 180, 0.1)',
    textAlign: "center",
    color: 'white',
},

marginFix: {
    marginLeft: 20,
    marginBottom: 10,
},
buttonFix: {
    marginTop: 40,
},
textFix: {
    maxWidth: "50%",
},
projectView: {
    width: 280,
    borderRadius: 12,
    marginLeft: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: 'rgba(180, 180, 180, 0.1)',
    overflow: "hidden",

},
projectDropDownAndroid: {
    width: 280,
    height: 55,
    borderRadius: 30,
    backgroundColor: 'rgba(180, 180, 180, 0.1)',
    padding: 10,
},
projectDropDownIos: {
    width: 280,
    height: 200,
    borderRadius: 30,
    backgroundColor: 'rgba(180, 180, 180, 0.1)',
    padding: 10,
},
});