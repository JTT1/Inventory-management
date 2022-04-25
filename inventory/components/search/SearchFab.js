import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { searchStyles as styles } from './SearchStyles';
import { MaterialIcons } from '@expo/vector-icons';

const SearchFab = (props) => {
    return (
        <Pressable style={[styles.searchFAB, styles.boxShadow]} onPress={props?.toggle}>
            <MaterialIcons name="search" size={36} color={styles.bodyTextDark.color} />
        </Pressable>
    )
}

export default SearchFab