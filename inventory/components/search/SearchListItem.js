import { Text, View, ScrollView, Pressable, Image } from 'react-native';
import { searchStyles as styles } from './SearchStyles';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const SearchListItem = ({ item }) => {
    return (
        <View style={[styles.searchListItem, styles.borderStart]}>
            <View style={styles.flexRow}>
                <Text style={[styles.bodyTextWhite, styles.h4]}>
                    {item.Nimike}
                </Text>
            </View>
            <View style={styles.flexRow}>
                <MaterialIcons name="category" size={30} color="white" />
                <Text style={styles.bodyTextWhite}>
                    {item.Kategoria}
                </Text>
            </View>
            <View style={[styles.flexRow, styles.flexBetween]}>
                <View style={styles.flexRow}>
                    {
                        item.Maara !== "" ? <MaterialIcons name="check" size={30} color="#13FF80" />
                            : <MaterialIcons name="do-not-disturb" size={30} color="#F4307C" />
                    }
                    <Text style={styles.bodyTextWhite}>
                        {item.Maara} kpl varastossa
                    </Text>
                </View>
                <View style={[styles.flexRow, styles.location]}>
                    <MaterialIcons name="map" size={30} color="white" />
                    <Text style={[styles.bodyTextWhite]}>
                        {item.Sijainti}
                    </Text>
                </View>
            </View>
        </View >
    )
}

export default SearchListItem;
