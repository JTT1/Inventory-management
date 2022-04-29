import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { scannerStyles as styles } from './ScannerStyle.js';
import { MaterialIcons } from '@expo/vector-icons';


const TrayListItem = ({ item, navigation }) => {

    const handlePress = () => {
        navigation.navigate('Komponentti', { item: item })
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={[styles.flexRow, styles.trayItem]}>
                <Text style={[styles.bodyTextWhite]}>
                    {item.Nimike}
                </Text>
                {item.Maara > 0 ?
                    <View style={[styles.flexRow]}>
                        <MaterialIcons
                            name="check"
                            size={30}
                            color="#13FF80"
                        />
                        <Text style={[styles.bodyTextWhite]}>
                            {item.Maara} kpl
                        </Text>
                    </View>
                    :
                    <View style={[styles.flexRow]}>
                        <MaterialIcons
                            name="do-not-disturb"
                            size={30}
                            color="#F4307C"
                        />
                        <Text style={[styles.bodyTextWhite]}>
                            0 kpl
                        </Text>
                    </View>
                }
            </View>
        </TouchableOpacity >

    )
}

export default TrayListItem;