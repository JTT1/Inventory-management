import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle';
export const searchStyles = StyleSheet.create({
    ...styles,
    searchContainer: {
        backgroundColor: "#8F8ABF",
    },
    results: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#605A91',
        marginVertical: 5,
    },
    searchListItem: {
        alignSelf: 'stretch',
        borderColor: '#605A91',
        borderTopWidth: 2,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginLeft: 0,
        margin: 2,
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexBetween: {
        justifyContent: 'space-between',
    },
    stretch: {
        alignSelf: 'stretch',
    },
    location: {
        marginRight: 30,
    },
});