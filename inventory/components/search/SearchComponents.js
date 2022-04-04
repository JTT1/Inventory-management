import { ScrollView, View, Text } from 'react-native';
import React from 'react';
import { searchStyles } from './SearchStyles';
import SearchListItem from './SearchListItem.js';
import SearchFab from './SearchFab.js';
import uuid from 'react-uuid';

const SearchComponents = () => {
    // Sample data
    const data = [
        {
            ID: "123",
            Kategoria:
                "Sähkömoottorit ja ohjaimet",
            Lisätieto: "",
            Määrä: 90,
            Nimike: "Testinimike 123_567",
            Sijainti: "2.3.4",
        },
    ]
    // Map data for list render
    const listItems = data.map((item) => <SearchListItem item={item} key={uuid()} />)

    return (
        <View style={searchStyles.container}>
            <View>
                <Text style={[searchStyles.bodyTextWhite, searchStyles.h1]}>
                    Hae komponentteja
                </Text>
            </View>
            <View style={searchStyles.results}>
                <Text style={[searchStyles.bodyText, searchStyles.bodyTextWhite, { paddingVertical: 10 }]}>
                    Hakutulokset
                </Text>
                <ScrollView style={searchStyles.stretch}>
                    {listItems}
                </ScrollView>
            </View>
            <SearchFab />
        </View>
    )
}

export default SearchComponents;