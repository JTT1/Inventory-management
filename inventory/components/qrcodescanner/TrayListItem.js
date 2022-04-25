import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { scannerStyles as styles } from './ScannerStyle.js';
import { MaterialIcons } from '@expo/vector-icons';


const TrayListItem = ({ item, navigation }) => {

    // console.log(item)

    const handlePress = () => {
        navigation.navigate('Komponentti', { item: item })
    }

    return (
        <View style={[styles.trayItem, styles.flexRow, styles.flexBetween]}>
            <TouchableOpacity onPress={handlePress} style={[styles.centerVertical]}>
                <Text style={[styles.bodyTextWhite]}>
                    {item.Nimike}
                </Text>
            </TouchableOpacity>
            {item.Maara > 0 ? <Text style={[styles.bodyTextWhite]}>
                <MaterialIcons
                    name="check"
                    size={30}
                    color="#13FF80"
                />
                {item.Maara} kpl
            </Text>
                : <Text style={[styles.bodyTextWhite]}>
                    <MaterialIcons
                        name="do-not-disturb"
                        size={30}
                        color="#F4307C"
                    /> 0 kpl
                </Text>}
        </View>
    )
}

export default TrayListItem;