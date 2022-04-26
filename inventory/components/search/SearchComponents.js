import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
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
    const [isLoaded, setLoaded] = useState(true);
    const inputRef = useRef();

    // Firebase query
    useEffect(() => {
        (async () => {
            fetchAllItems()
                .then((res) => {
                    if (res.length > 0) {
                        setData(res);
                    } else {
                        Alert.alert('Virhe', 'Komponentteja ei pystytty hakemaan.');
                    }
                });
        })();
    }, []);

    // On search submit -> hide search field, filter the data array to show search results, and finish loading
    useEffect(() => {
        filterData(data, searchTerm)
            .then((res) => {
                setFilteredItems(res);
                setLoaded(true);
                setSearchField(false);
            })
    }, [searchTerm]);

    // Wipes whitespace of given string and turns it into lowercase
    const formatString = async (string) => {
        return string.split(' ').join('').toLowerCase().trim();
    }

    // Search by category or name
    const filterData = async (data, term) => {
        if (term.trim() === '') {
            return [];
        }
        let searchItemsArray = await data.map((item) => item)

        // Async filter function to not freeze the application when executing the filtering
        let asyncFilter = async function (array) {
            let search = await formatString(term);

            let temp = [];
            for (let item = 0; item < array.length; item++) {
                let itemName = await formatString(array[item].Nimike);
                let trayNumber = await formatString(array[item].Tarjotin.toString());
                if (itemName.includes(search) || trayNumber.includes(search)) {
                    temp.push(array[item]);
                };
            }
            return temp;
        };
        return await asyncFilter(searchItemsArray);
    }

    // Filtered list render
    const listItems = filteredItems.length > 0
        ? filteredItems.map((item) => <SearchListItem {...props} item={item} key={uuid()} />)
        : <View style={{ textAlign: 'center', padding: 20 }}>
            <Text style={[styles.bodyTextWhite, styles.h5]}>
                { // On initial load, guide the user to press the search button
                    searchTerm.length === 0
                        ? 'Aloita painamalla alla olevaa hakupainiketta.'
                        : isLoaded &&
                        'Ei hakutuloksia'
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
                <ScrollView style={[styles.stretch]}>
                    {listItems}
                </ScrollView>
            </View>

            <Modal style={[styles.searchModal]}
                isVisible={searchFieldOpen}
                onBackButtonPress={() => setSearchField(false)}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
                onModalShow={() => inputRef.current.focus()}
            >
                {!isLoaded ?
                    <View style={[styles.flexBox, styles.stretch, styles.centerVertical]}>
                        <ActivityIndicator size={100} color="#1DFFBB" />
                    </View>
                    :
                    <React.Fragment>
                        <View style={[styles.flexRow]}>
                            <TouchableOpacity onPress={() => setSearchField(false)} style={[styles.cancelFAB]}>
                                <MaterialIcons name="close" size={30} color="white" />
                            </TouchableOpacity>
                            <Text style={[styles.bodyTextWhite]}>
                                Sulje
                            </Text>
                        </View>
                        {searchFieldOpen &&
                            <SearchField
                                inputRef={inputRef}
                                data={data}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                setLoaded={setLoaded} />
                        }
                    </React.Fragment>
                }
            </Modal>
            <SearchFab toggle={() => setSearchField(true)} />
        </View>
    )
}

export default SearchComponents;