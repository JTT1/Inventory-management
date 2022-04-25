import { TouchableOpacity } from 'react-native';
import React from 'react';
import { searchStyles as styles } from './SearchStyles';
import { MaterialIcons } from '@expo/vector-icons';

const SearchFab = (props) => {
    return (
        <TouchableOpacity style={[styles.searchFAB, styles.boxShadow]} onPress={props?.toggle}>
            <MaterialIcons name="search" size={36} color={styles.bodyTextDark.color} />
        </TouchableOpacity>
    )
}

export default SearchFab;