import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { searchStyles as styles } from './SearchStyles';
import SearchListItem from './SearchListItem.js';
import SearchFab from './SearchFab.js';
import SearchField from './SearchField';
import uuid from 'react-uuid';
import { fetchAllItems } from '../../helpers/firebaseFunctions';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';


const SearchComponents = (props) => {
    const [data, setData] = useState([]);
    const [searchFieldOpen, setSearchField] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    // Firebase query
    useEffect(() => {
        fetchAllItems(setData);
    }, []);

    // On search submit -> hide search field, filter the data array to show search results, and finish loading
    useEffect(() => {
        setSearchField(false);
        setFilteredItems(filterData(data, searchTerm));
        setLoaded(true);
    }, [searchTerm]);

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
            return [];
        }
        const searchItemsArray = data.map((item) => item).filter((item) => {
            let search = formatString(term);
            let itemName = formatString(item.Nimike);
            let trayNumber = formatString(item.Tarjotin.toString());
            return itemName.includes(search) || trayNumber.includes(search);
        });
        return searchItemsArray;
    }

    // Filtered list render
    const listItems = filteredItems.length > 0
        ? filteredItems.map((item) => <SearchListItem {...props} item={item} key={uuid()} />)
        : <View style={{ textAlign: 'center', padding: 20 }}>
            <Text style={[styles.bodyTextWhite, styles.h5]}>
                {
                    // On initial load, guide the user to press the search button
                    searchTerm.length === 0
                        ? 'Aloita painamalla alla olevaa hakupainiketta.'
                        : 'Ei hakutuloksia'
                }
            </Text>
        </View>

    return (
        <View style={[styles.flexBox, { backgroundColor: '#2C2A4C' }]}>
            <View>
                <Text style={[styles.bodyTextWhite, styles.h1]}>
                    Hae komponentteja
                </Text>
            </View>
            <View style={[styles.searchResults, styles.boxShadow]}>
                {!isLoaded
                    ? <ActivityIndicator size="large" color="#1DFFBB" />
                    : <ScrollView style={[styles.stretch]}>
                        {listItems}
                    </ScrollView>
                }
            </View>

            {/* Conditionally render either FAB or search field */}
            <Modal style={[styles.searchModal]}
                isVisible={searchFieldOpen} animationIn={'fadeIn'} animationOut={'fadeOut'}>
                <View style={[styles.flexRow]}>
                    <TouchableOpacity onPress={() => setSearchField(false)} style={[styles.cancelFAB]}>
                        <MaterialIcons name="close" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={[styles.bodyTextWhite]}>
                        Sulje
                    </Text>
                </View>
                <SearchField data={data} setSearchTerm={setSearchTerm} setLoaded={setLoaded}
                />
            </Modal>
            <SearchFab toggle={toggleSearchField} />
        </View >
    )
}

export default SearchComponents;