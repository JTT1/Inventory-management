
import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle'

export const profileStyles = StyleSheet.create({
    ...styles,
    
    mainContainer: {
        backgroundColor: '#2C2A4C',
        height: "100%",
        width: "100%"
    },
    userImg: {
        borderRadius: 100,
        width: 150,
        height: 150,
        marginBottom: 15,
    },
    marginFix: {
        marginBottom: 15
    },
    alignLeft: {
        alignSelf:"flex-start"
    },
    alignMiddle: {
        marginLeft:"26%"
    },
    imgContainer: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#1DFFBB',
        shadowColor: '#000000',
    },
    icons: {
        marginRight: 10,
        marginLeft: 15
    },
    iconShadow: {
        textShadowOffset:
            { height: 4, width: 0 },
        textShadowColor: '#5E5A86',
        textShadowRadius: 15,
    },
    profileBackgroundImage: {
        width: "100%",

    },
    profileButtons: {
        marginLeft: 30,
        marginRight: 30,
    },
    myInfo: {
        width: "60%",
        padding: 5,
        backgroundColor: "#1DFFBB"  
    },
    myLoans: {
        width: "60%",
        padding: 5,
        borderLeftWidth: 1,  
        backgroundColor: "#F4247C"  
    },
    infoBox: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#1DFFBB",
        
    },
    mainInfoBox: {
        width: "100%",
        marginTop: "15%"
    },
        loanListItem: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        borderColor: '#605A91',
        color: 'white',
        paddingLeft: 15,
        marginTop: 0,
        
    },
    loanedItemName: {
        width: '100%',
        paddingVertical: 10,
    },
    swipableView: {
        height: '100%',
        backgroundColor: '#F4247C',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    innerContainer: {
        flexDirection: 'row',
    },
    loanDetails: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#302D53',
    },
});