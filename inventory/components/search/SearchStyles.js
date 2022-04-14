import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle';
export const searchStyles = StyleSheet.create({
    ...styles,
    searchResults: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#605A91',
        backgroundColor: '#393663',
        marginVertical: 5,
        maxHeight: 430,
        color: 'white',
    },
    searchListItem: {
        padding: 5,
        alignSelf: 'stretch',
        borderColor: '#605A91',
        borderTopWidth: 2,
    },
    searchFAB: {
        alignSelf: 'center',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        bottom: 20,
        backgroundColor: '#96E9CB',
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#fff',
    },
    searchFieldContainer: {
        marginTop: 40,
        width: 312,
        height: 56,
        backgroundColor: '#5E5A86',
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#96E9CB',
        paddingHorizontal: 15,
    },
    searchInput: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    suggestionListItem: {
        marginVertical: 5
    },
});