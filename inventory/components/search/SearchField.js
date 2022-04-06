import { View, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { searchStyles as styles } from './SearchStyles';

const SearchField = ({ setSearchTerm, setLoaded }) => {
    const [term, setTerm] = useState('');

    // Helper to handle search term state
    const handleSearchInput = (text) => {
        setTerm(text);
    }

    // When user submits the search, update parent state
    const handleSearch = () => {
        // Trim to remove any unnecessary whitespace from the search term
        setSearchTerm(term.trim())
        setLoaded(false);
    }

    return (
        <View style={[styles.searchField, styles.boxShadow]}>
            <TextInput style={[styles.bodyTextWhite]}
                autoFocus={true}
                value={term}
                onChangeText={text => handleSearchInput(text)}
                placeholder="Hae komponentteja"
                keyboardType='default'
                onSubmitEditing={handleSearch}
                clearTextOnFocus={true}
            />
        </View>
    )
}

export default SearchField;