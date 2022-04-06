import { StyleSheet } from 'react-native';
import { styles } from '../../styles/AppRootStyle';
export const searchStyles = StyleSheet.create({
    ...styles,
    results: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#605A91',
        backgroundColor: '#393663',
        marginVertical: 5,
        maxHeight: 430,
    },
    searchListItem: {
        padding: 5,
        alignSelf: 'stretch',
        borderColor: '#605A91',
        borderTopWidth: 2,
    },
    flexBox: {
        flex: 1,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 1,
    },
    flexBetween: {
        justifyContent: 'space-between',
    },
    stretch: {
        alignSelf: 'stretch',
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
    searchField: {
        bottom: 10,
        position: 'absolute',
        marginTop: 20,
        width: 312,
        height: 56,
        backgroundColor: '#5E5A86',
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#96E9CB',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: 15,
    },
});