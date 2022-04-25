import { Text, View, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { searchStyles as styles } from './SearchStyles';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const SearchListItem = ({ item, navigation, }) => {
    // insert functionality to open map here
    const handleMapOpen = () => {
        console.log('map')
    }

    // Route to component.js
    const handleRouting = () => {
        return
    }

    return (
        <View style={[styles.searchListItem]}>
            <TouchableOpacity onPress={handleRouting}>
            <View style={styles.flexRow}>
                <Text style={[styles.bodyTextWhite, styles.upperCase, styles.h5, { color: '#6EEEFF' }]}>
                    {item.Nimike}
                </Text>
            </View>
            </TouchableOpacity>
            <View style={styles.flexRow}>
                <MaterialIcons
                    name="category"
                    size={30}
                    color="white"
                />
                <Text style={styles.bodyTextWhite}>
                    {item.Tarjotin}
                </Text>
            </View>
            <View style={[styles.flexRow, styles.flexBetween]}>
                <View style={styles.flexRow}>
                    {
                        item.Maara !== ""
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
                {
                    item.Sijainti != ""
                    && <TouchableOpacity onPress={handleMapOpen}>
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
                        </TouchableOpacity>
                }
            </View>
        </View >
    )
}

export default SearchListItem;
