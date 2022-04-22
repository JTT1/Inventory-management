import { View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { searchStyles as styles } from './SearchStyles';
import Fuse from 'fuse.js';
import uuid from 'react-uuid';

const SearchField = ({ data, setSearchTerm, setLoaded }) => {
    const [term, setTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const inputRef = useRef();
    // Fuse search configuration
    const fuse = new Fuse(data, {
        keys: [
            'Nimike',
            'Tarjotin',
        ],
        // includeMatches: true,
        // minMatchCharLength: 1,
        threshold: 0.2,
    });

    // Helper to handle search term state
    const handleSearchInput = (text) => {
        let suggestionsList = [];
        setTerm(text);

        // Create the suggestion list (fuse.js)
        if (text.length > 0) {
            suggestionsList = fuse.search(term).map((item) =>
            item.item.Nimike
        );
        } else { // don't show any suggestions if search term is empty
            suggestionsList = [];
        }
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
        <View>
            <View style={[styles.searchFieldContainer, styles.boxShadow]}>
                <TextInput style={[styles.bodyTextWhite, styles.searchInput]}
                    ref={inputRef}
                    onLayout={() => inputRef.current.focus()}
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
                        <Text style={[styles.bodyTextWhite, styles.h5, styles.suggestionListItem]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
}
export default SearchField;