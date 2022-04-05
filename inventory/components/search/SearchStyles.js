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
    searchFAB: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'absolute',
        bottom: 10,
        backgroundColor: '#96E9CB',
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000000',
        elevation: 10,
        shadowOffset: {
            height: 10,
            width: 10
        },
    },
    searchField: {
        position: 'absolute',
        alignSelf: 'center',
        width: 312,
        height: 56,
        bottom: 10,
        backgroundColor: '#5E5A86',
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#96E9CB',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
});