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
    maxHeight: 220,
    marginTop: 45,
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

input: {
    width: 280,
    height: 55,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(180, 180, 180, 0.1)',
    padding: 10,
},

input2: {
    width: 130,
    height: 55,
    margin: 10,
    marginLeft: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(180, 180, 180, 0.1)',
    textAlign: "center",
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
    marginTop: 13
},
});