import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { searchStyles as styles } from './SearchStyles';
import SearchListItem from './SearchListItem.js';
import SearchFab from './SearchFab.js';
import SearchField from './SearchField';
import uuid from 'react-uuid';
import { db, ROOT_REF } from '../../firebase/Config';

const SearchComponents = () => {
    const [data, setData] = useState([]);
    const [searchFieldOpen, setSearchField] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        db.ref(ROOT_REF).on('value', querySnapShot => {
            let data = querySnapShot.val() ? querySnapShot.val() : {};
            let items = { ...data };
            let keys = Object.keys(items);
            const mappedItems = keys.map((key) => items[key])
            setData(mappedItems);
        });
    }, []);

    // When search is submitted
    useEffect(() => {
        setSearchField(false)
        setFilteredItems(filterData(data, searchTerm))
        setLoaded(true)
    }, [searchTerm])

    // Toggle search field when FAB is pressed
    const toggleSearchField = () => {
        setSearchField(!searchFieldOpen);
    }

    // Search from category or name
    const filterData = (data, term) => {
        if (term.trim() === '') {
            return []
        }
        const array = data.map((item) => item).filter((item) => {
            const search = term.split(' ').join('').toLowerCase().trim();
            const itemName = item.Nimike.split(' ').join('').toLowerCase().trim();
            const itemCategory = item.Kategoria.split(' ').join('').toLowerCase().trim();
            return itemName.includes(search) || itemCategory.includes(search)
        });
        return array
    }

    // Filtered list render
    const listItems = filteredItems.length > 0 ? filteredItems.map((item) => <SearchListItem item={item} key={uuid()} />)
        : <Text style={styles.bodyTextWhite}>Ei hakutuloksia</Text>

    return (
        <View style={{ flex: 1, paddingBottom: 50 }}>
            <View>
                <Text style={[styles.bodyTextWhite, styles.h1]}>
                    Hae komponentteja
                </Text>
            </View>
            <View style={styles.results}>
                <Text style={[styles.bodyTextWhite, styles.h4]}>
                    Hakutulokset
                </Text>
                {!loaded ? <ActivityIndicator size="large" color="#00ff00" /> :
                    <ScrollView style={[styles.stretch, styles.scrollView]}>
                        {listItems}
                    </ScrollView>
                }
            </View>
            {searchFieldOpen && <SearchField setSearchTerm={setSearchTerm} setLoaded={setLoaded} />}
            {!searchFieldOpen && <SearchFab toggle={toggleSearchField} />}
        </View>
    )
}

export default SearchComponents;