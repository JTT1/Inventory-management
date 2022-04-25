import { View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { searchStyles as styles } from './SearchStyles';
import Fuse from 'fuse.js';
import uuid from 'react-uuid';

const SearchField = ({ data, setSearchTerm, setLoaded, searchTerm, inputRef }) => {
    const [term, setTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    // Fuse.js search configuration
    const fuse = new Fuse(data, {
        keys: [
            'Nimike',
            'Tarjotin',
        ],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
        shouldSort: true,
    });

    // Helper to handle search term state
    const handleSearchInput = (text) => {
        let suggestionsList = [];
        setTerm(text);

        // Create the suggestion list (fuse.js)
        if (text.length > 1) {
            suggestionsList = fuse.search(term).map((item) =>
            item.item.Nimike
        );
        } else { // don't show suggestions if search term is empty
            suggestionsList = [];
        }
        setSuggestions(suggestionsList);
    }

    // When user submits the search, update parent state
    const handleSearch = () => {
        // if empty field, or only whitespace submitted, or if previous search
        if (term.trim() === searchTerm) {
            return
        }
        if (term.trim() === '') {
            setTerm('');
            return
        } else {
            // Show loading indicator
            setLoaded(false);

            // Remove any unnecessary whitespace from the search term
            setSearchTerm(term.trim())
        }
    }

    return (
        <View style={[styles.stretch, styles.centerHorizontal]}>
            <View style={[styles.searchFieldContainer, styles.boxShadow]}>
                <TextInput style={[styles.bodyTextWhite, styles.searchInput]}
                    ref={inputRef}
                    value={term}
                    onChangeText={text => handleSearchInput(text)}
                    placeholder='Hae komponentteja'
                    keyboardType='default'
                    onSubmitEditing={handleSearch}
                    clearTextOnFocus={true}
            />
        </View>
            <ScrollView style={styles.suggestionsList} keyboardDismissMode={'on-drag'}>
                {suggestions.map((item) =>
                    <TouchableOpacity key={uuid()} onPress={() => setSearchTerm(item)}>
                        <Text style={[styles.bodyTextWhite, styles.h4, styles.suggestionListItem]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
}
export default SearchField;