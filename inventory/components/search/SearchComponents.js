import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { searchStyles as styles } from './SearchStyles';
import SearchListItem from './SearchListItem.js';
import SearchFab from './SearchFab.js';
import SearchField from './SearchField';
import uuid from 'react-uuid';
import { db, ROOT_REF } from '../../firebase/Config';
import ThemeButton from '../testing_field/ThemeButton';

const SearchComponents = () => {
    const [data, setData] = useState([]);
    const [searchFieldOpen, setSearchField] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    // Firebase query
    useEffect(() => {
        db.ref(ROOT_REF).on('value', querySnapShot => {
            const data = querySnapShot.val() ? querySnapShot.val() : {};
            const items = { ...data };
            const keys = Object.keys(items);
            const mappedItems = keys.map((key) => items[key])
            setData(mappedItems);
        });
    }, [isLoaded]);

    // On search submit -> hide search field, filter the data array, and finish loading
    useEffect(() => {
        setSearchField(false);
        setFilteredItems(filterData(data, searchTerm));
        setLoaded(true);
    }, [searchTerm])

    // Toggle search field when FAB is pressed
    const toggleSearchField = () => {
        setSearchField(!searchFieldOpen);
    }

    // Wipes whitespace of given string and turns it into lowercase
    const formatString = (string) => {
        return string.split(' ').join('').toLowerCase().trim();
    }

    // Search by category or name
    const filterData = (data, term) => {
        if (term.trim() === '') {
            return []
        }
        const searchItemsArray = data.map((item) => item).filter((item) => {
            let search = formatString(term);
            let itemName = formatString(item.Nimike);
            let itemCategory = formatString(item.Kategoria);
            return itemName.includes(search) || itemCategory.includes(search)
        });
        return searchItemsArray
    }

    // Filtered list render
    const listItems = filteredItems.length > 0
        ? filteredItems.map((item) => <SearchListItem item={item} key={uuid()} />)
        : <View style={{ textAlign: 'center', padding: 20 }}>
            <Text style={[styles.bodyTextWhite, styles.h5]}>
                {
                    // On initial load, guide the user to press the search button
                    searchTerm.length === 0
                        ? 'Aloita painamalla alla olevaa hakupainiketta'
                        : 'Ei hakutuloksia'
                }
            </Text>
        </View>

    return (
        <View style={styles.flexBox}>
            <View>
                <Text style={[styles.bodyTextWhite, styles.h1]}>
                    Hae komponentteja
                </Text>
            </View>
            {/* <Text style={[styles.bodyTextWhite, styles.h4]}>
                Hakutulokset
            </Text> */}
            <View style={[styles.searchResults, styles.boxShadow]}>
                {!isLoaded
                    ? <ActivityIndicator size="large" color="#1DFFBB" />
                    : <ScrollView style={[styles.stretch]}>
                        {listItems}
                    </ScrollView>
                }
            </View>
            {/* Conditionally render either FAB or search field */}
            {searchFieldOpen
                ? <SearchField setSearchTerm={setSearchTerm} setLoaded={setLoaded} />
                : <SearchFab toggle={toggleSearchField} />}
        </View >
    )
}

export default SearchComponents;