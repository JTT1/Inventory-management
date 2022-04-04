import { ScrollView, View, Text } from 'react-native';
import React from 'react';
import { searchStyles } from './SearchStyles';
import SearchListItem from './SearchListItem.js';
import SearchFab from './SearchFab.js';
import uuid from 'react-uuid';

const SearchComponents = () => {
    // const handleError = (e) => { console.log(e.nativeEvent.error); };

    // Sample data
    const data = [
        {
            ID: "2323",
            Kategoria:
                "Sähkömoottorit ja ohjaimet",
            Lisätieto: "",
            Määrä: 200,
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "1.3.1",
        }, {
            ID: "2323",
            Kategoria:
                "Sähkömoottorit ja ohjaimet",
            Lisätieto: "",
            Määrä: 200,
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "1.3.1",
        }, {
            ID: "2323",
            Kategoria:
                "Sähkömoottorit ja ohjaimet",
            Lisätieto: "",
            Määrä: 0,
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "1.3.1",
        }, {
            ID: "2323",
            Kategoria:
                "Sähkömoottorit ja ohjaimet",
            Lisätieto: "",
            Määrä: 200,
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "1.3.1",
        }, {
            ID: "2323",
            Kategoria:
                "Sähkömoottorit ja ohjaimet",
            Lisätieto: "",
            Määrä: 200,
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "1.3.1",
        }, {
            ID: "2323",
            Kategoria:
                "Sähkömoottorit ja ohjaimet",
            Lisätieto: "",
            Määrä: 200,
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "1.3.1",
        }, {
            ID: "2323",
            Kategoria:
                "Sähkömoottorit ja ohjaimet",
            Lisätieto: "",
            Määrä: 0,
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "1.3.1",
        }, {
            ID: "2323",
            Kategoria:
                "Sähkömoottorit ja ohjaimet",
            Lisätieto: "",
            Määrä: 200,
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "1.3.1",
        }, {
            ID: "2323",
            Kategoria:
                "Sähkömoottorit ja ohjaimet",
            Lisätieto: "",
            Määrä: 200,
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "1.3.1",
        }, {
            ID: "2323",
            Kategoria:
                "Sähkömoottorit ja ohjaimet",
            Lisätieto: "",
            Määrä: 200,
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "1.3.1",
        }, {
            ID: "2323",
            Kategoria:
                "Sähkömoottorit ja ohjaimet",
            Lisätieto: "",
            Määrä: 200,
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "1.3.1",
        }, {
            ID: "2323",
            Kategoria:
                "Sähkömoottorit ja ohjaimet",
            Lisätieto: "",
            Määrä: 200,
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "1.3.1",
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