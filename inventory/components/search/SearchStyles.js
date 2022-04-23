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
        maxHeight: "75%",
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
        bottom: "7%",
        backgroundColor: '#96E9CB',
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#fff',
    },
    searchModal: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    },
    searchFieldContainer: {
        borderWidth: 2,
        marginTop: 40,
        width: '100%',
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
        paddingLeft: 10,
    },
    suggestionsList: {
        maxHeight: '100%',
        width: '100%',
    },
    suggestionListItem: {
        marginVertical: 5

    },
    cancelFAB: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#5E5A86',
        padding: 5,
        marginRight: 5,
        height: 50,
        width: 50
    }
});