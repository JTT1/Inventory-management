import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TrayList = ({ item, styles, dbItems, setDbItems }) => {

    const [checked, setChecked] = useState(false);
    // insert functionality to open map here
    const handleMapOpen = () => {
        console.log('map')
    }

    // Route to component.js
    const handleRouting = () => {
        navigation.navigate('Komponentti', { item: item })
    }

    const handleChecked= () => {
        let dbItemsCopy = [...dbItems];

        setChecked(!checked)

        if (checked == false) {
            // setDbItems([...dbItemsCopy, item.ID])
            dbItemsCopy.push(item.ID)
        } 

        if (checked == true) {
            let index = dbItemsCopy.indexOf(item.ID);
            console.log(index + " indexi")
            dbItemsCopy.splice(index, 1);
        }

        setDbItems(dbItemsCopy);
    }

    return (
        <View style={styles.loanListItem}>
                    <View style={[styles.stretch, styles.flexRow]}>
                        <View style={styles.loanedItemName}>
                            <Text style={styles.h4}>
                                {item.Nimike}
                            </Text>
                        </View>

                        <Pressable onPress={handleChecked}>
                            {!checked
                                ?
                                <View style={[styles.checkBoxContainer]}>
                                    <MaterialCommunityIcons name="checkbox-blank-outline"
                                        size={36}
                                        color="white" />
                                </View>
                                :
                                <View style={[styles.checkBoxContainer]}>
                                    <MaterialCommunityIcons name="checkbox-blank-outline"
                                        size={36} color="white"
                                        style={styles.returnListCheckbox} />
                                    <MaterialCommunityIcons
                                        name="check"
                                        size={40}
                                        color="#1DFFBB"
                                        style={styles.returnListCheckMark} />
                                </View>
                            }
                        </Pressable>

                    </View>
                </View>
    )
}

export default TrayList;
