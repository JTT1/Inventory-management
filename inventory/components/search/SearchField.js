import { View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { searchStyles as styles } from './SearchStyles';
import Fuse from 'fuse.js';
import uuid from 'react-uuid';

const SearchField = ({ data, setSearchTerm, setLoaded }) => {
    const [term, setTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Fuse search configuration
    const fuse = new Fuse(data, {
        keys: [
            'Nimike',
            'Tarjotin',
        ],
        // includeMatches: true,
        minMatchCharLength: 1,
        threshold: 0.2,
    });

    // Helper to handle search term state
    const handleSearchInput = (text) => {
        setTerm(text);

        // Create the suggestion list (fuse.js)
        const suggestionsList = fuse.search(term).map((item) =>
            item.item.Nimike
        );
        setSuggestions(suggestionsList);
    }

    // When user submits the search, update parent state
    const handleSearch = () => {
        // if empty field, or only whitespace submitted
        if (term.trim() === '') {
            setTerm('');
            return
        }
        else {
            // Remove any unnecessary whitespace from the search term
            setSearchTerm(term.trim())
            // Loading indicator
            setLoaded(false);
        }
    }

    return (
        <View style={[styles.searchFieldContainer, styles.boxShadow]}>
            <View>
                <TextInput style={[styles.bodyTextWhite, styles.searchInput]}
                autoFocus={true}
                value={term}
                onChangeText={text => handleSearchInput(text)}
                    placeholder='Hae komponentteja'
                keyboardType='default'
                onSubmitEditing={handleSearch}
                clearTextOnFocus={true}
            />
        </View>
            <ScrollView>
                {suggestions.map((item) =>
                    <TouchableOpacity key={uuid()} onPress={() => setSearchTerm(item)}>
                        <Text style={[styles.bodyTextWhite, styles.suggestionListItem]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
}
export default SearchField;