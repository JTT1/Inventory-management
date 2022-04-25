import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle';

export const homeStyles = StyleSheet.create({
    ...styles,
backgroundColor: {
    backgroundColor: '#2C2A4C',
    height: "100%"
},

  mainBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 35,
    flexDirection: "column",
  },

  flexRow: {
    flexDirection:"row",
    marginTop: 20,
  },

  secondaryBox: {
    width: "70%",
    borderColor: "#8F8ABF",
    marginBottom: 10,
    flexDirection: "column",
    borderTopWidth: 2,
  },

  imageBox: {
    justifyContent: "center",
    textShadowOffset: { height: 1, width: -3 }, 
    textShadowColor: '#000000', 
    textShadowRadius: 20,
  },

  qrIcon: {
    marginTop: 17
  },

  h2WidthFix: {
    fontSize: 25
  },

  homeIcon: {
    marginRight: 5
  },

  removeSpacer: {
    borderTopWidth: 0
  },
});