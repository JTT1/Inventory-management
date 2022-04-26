import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle';

export const returnLoanStyles = StyleSheet.create({
    ...styles,
    loanListItem: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        borderColor: '#605A91',
        backgroundColor: '#393663',
        color: 'white',
        paddingLeft: 15,
        marginTop: 0,
        elevation: 10,
    },
    loanedItemName: {
        width: '70%',
        paddingVertical: 10,
    },
    checkBoxContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    returnListCheckbox: {
        position: 'absolute',

    },
    returnListCheckMark: {
        marginLeft: 10,
        marginBottom: 7,
    },
    bounceInArrow: {
        transform: [{ translateX: 50 }]
    },
    swipableView: {
        height: '100%',
        backgroundColor: '#F4247C',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    swipableArrowContainer: {
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    iconPadding: {
        paddingHorizontal: 5
    },
    innerContainer: {
        flexDirection: 'row',
    },
    loanDetails: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#302D53',

    },
    detailsColumn: {
        padding: 5,
        marginLeft: 5
    },
    detailsGap: {
        marginTop: 5,
    },
    returnInputField: {
        alignSelf: 'center',
        textAlign: 'right',
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: "rgba(143,138,191,0.5)",
        height: 40,
        width: 70,
        color: 'white'
    },
    historyListContainer: {
        flex: 1,
        alignSelf: 'center',
        padding: 10,
        marginTop: 10,
        maxHeight: "65%",
        backgroundColor: "#302D53",
        borderWidth: 2,
        borderColor: '#605A91',
        elevation: 10,
    },
    historyListItem: {
        borderBottomWidth: 2,
        borderColor: '#605A91',
        padding: 10,
    },
    closeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5E5A86',
        borderRadius: 26,
        height: 50,
        width: 50,
        marginRight: 10,
    },
    brokenItemInput: {
        marginTop: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: "#302D53",
        width: 270,
        height: 200,
        color: 'white'
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: "#1DFFBB",
        padding: 10,
        borderRadius: 15,
        color: '#393663',
        width: 100,
        margin: 10
    },
    cancelButton: {
        marginTop: 20,
        backgroundColor: "#1DFFBB",
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#F4247C',
        width: 100,
        margin: 10,
        textAlign: "center"
    },
    textCenter: {
        textAlign: "center"
    },
    modalBox: {
        backgroundColor: "rgba(57, 54, 99, 0.95)",
        width: "85%",
        height: 340,
        borderRadius: 15
    },
});