import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle';
export const returnLoanStyles = StyleSheet.create({
    ...styles,
    loanListItem: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#605A91',
        backgroundColor: '#393663',
        marginVertical: 5,
        maxHeight: 430,
        color: 'white',
        marginHorizontal: 10,
    },
});