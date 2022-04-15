import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle';

export const returnLoanStyles = StyleSheet.create({
    ...styles,
    loanListItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#605A91',
        backgroundColor: '#393663',
        color: 'white',
        paddingLeft: 15,
        marginTop: 10,
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
    }
});