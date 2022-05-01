import { Text, View, TouchableOpacity } from 'react-native';
import { searchStyles as styles } from './SearchStyles';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const SearchListItem = ({ item, navigation }) => {
    // insert functionality to open map here
    const handleMapOpen = () => {
        console.log('map')
    }

    // Route to component.js
    const handleRouting = () => {
        navigation.navigate('Komponentti', { item: item })
    }

    return (
            <TouchableOpacity onPress={handleRouting}>
            <View style={[styles.searchListItem]}>
                <View style={styles.flexRow}>
                    <Text style={[styles.bodyTextWhite, styles.upperCase, styles.h4, { color: '#6EEEFF' }]}>
                        {item.Nimike}
                    </Text>
                </View>

                <View style={[styles.flexRow, styles.flexBetween]}>
                <View style={styles.flexRow}>
                    {
                            item.Maara !== 0
                            ? <MaterialIcons
                                name="check"
                                size={30}
                                color="#13FF80"
                            />
                            : <MaterialIcons
                                name="do-not-disturb"
                                size={30}
                                color="#F4307C"
                            />
                    }
                    <Text style={styles.bodyTextWhite}>
                        {item.Maara} kpl
                    </Text>
                </View>
                    <TouchableOpacity onPress={handleMapOpen}>
                {

                    item.Sijainti != ""
                            && 
                        <View style={[styles.flexRow]}>
                            <MaterialIcons
                                name="map"
                                size={30}
                                color="white"
                            />
                            <Text style={[styles.bodyTextGreen]}>
                                {item.Sijainti}
                            </Text>
                        </View>
                        }
                    </TouchableOpacity>
            </View>
            </View>
        </TouchableOpacity>
    )
}

export default SearchListItem;
