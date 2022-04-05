import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { searchStyles as styles } from './SearchStyles';
import { MaterialIcons } from '@expo/vector-icons';

const SearchFab = ({ toggle }) => {


    return (
        <Pressable style={styles.searchFAB} onPress={toggle}>
            <MaterialIcons name="search" size={36} color={styles.bodyTextDark.color} />
        </Pressable>
    )
}

export default SearchFab