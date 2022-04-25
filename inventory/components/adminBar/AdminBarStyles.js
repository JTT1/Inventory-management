
import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle';

export const AdminBarStyles = StyleSheet.create({
    ...styles,


    adminContainer: {
        width: "80%",
        height: "34%",
        backgroundColor: "#2C2A4C",
        marginLeft: "10%",
        marginTop: "5%",
        borderRadius: 15,
        borderWidth: 3,
        borderColor: "#393663",
        zIndex: 1
    },

    adminText: {
        color: "#1DFFBB",
        margin: "6%",
        marginRight: "8%",
        marginTop: "4%"
    },

    adminIcons: {
        backgroundColor: "#5E5A86",
        width: 55,
        height: 55,
        borderRadius: 100,
        margin: "2%",
        borderWidth: 2,
        borderColor: "#8F8ABF",
        padding: "4.1%"
    },

    coolLine: {
        backgroundColor: "#393663",
        position: 'absolute',
        top: 55,
        left: -45,
        height: 3,
        zIndex: -1,
        width: "140%"        
    },

    
});
