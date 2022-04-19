import { View, Text, Pressable, Animated, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { returnLoanStyles as styles } from './ReturnLoanStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const LoanListItem = ({ item, updateItemList }) => {
    const [checked, setChecked] = useState(false);
    const [validInput, setValidInput] = useState(true);
    const [currentlyLoanedAmount, setCurrentlyLoanedAmount] = useState(item.lainattuMaara - item.palautukset);
    const [returnedBefore, setReturnedBefore] = useState(item.palautukset);
    const animation = useRef(new Animated.Value(60)).current;
    const shouldAnimate = useRef(false);
    const itemCopy = { ...item };

    // Check box handler
    const handleSelection = () => {
        // Add item to the list of items to be returned
        if (!checked) {
            updateItemList.push(itemCopy);
        } else {
            // remove when unchecked
            updateItemList.splice(updateItemList.indexOf(itemCopy));
        }
        if (currentlyLoanedAmount > 1) { // if multiple items bound to a loan, show additional functionalities
            toggleSwipeSuggestion();
        }
        setChecked(!checked);
    }

    // Amount validation and handling 
    const handleTextInput = (text) => {
        const index = updateItemList.findIndex(itemCopy => {
            return itemCopy.ID === item.ID;
        });
        setValidInput(true);

        // If higher amount than currently loaned
        if (Number(text) > currentlyLoanedAmount) {
            setValidInput(false);
            updateItemList[index].palautukset = currentlyLoanedAmount;
        } else {
            updateItemList[index].palautukset = returnedBefore + Number(text)

            if (updateItemList[index].palautukset === updateItemList[index].lainattuMaara) {
                updateItemList[index].palautettuKokonaan = true;
            }
        }
    }


    // When swiped left
    const handleSwipeGesture = (e) => {
        shouldAnimate.current = !shouldAnimate.current;
        toggleReturnDetails();
    }

    const handleBrokenItemInfo = () => {
        console.log('rikkinäinen')
    }


    // animation functions
    const toggleSwipeSuggestion = () => {
        Animated.spring(animation, {
            // When checkbox checked -> animate X to 0
            toValue: !checked ? 15 : 60,
            friction: 7,
            tension: 70,
            useNativeDriver: false,
        }).start();
    }

    const toggleReturnDetails = () => {
        Animated.spring(animation, {
            // When checkbox checked -> animate X to 0
            toValue: shouldAnimate.current ? -Dimensions.get('window').width / 1.5 : 15,
            friction: 7,
            tension: 40,
            useNativeDriver: false,
        }).start();
    }

    return (
        <View style={styles.loanListItem}>
            <View style={[styles.flexRow, styles.stretch]}>
                <View style={styles.loanedItemName}>
                    <Text style={[styles.bodyTextWhite, styles.h4,]}>
                        {item.komponentti}
                    </Text>

                    <Text style={[styles.bodyTextWhite]}>Projekti: {item.projekti}</Text>
                    <Text style={[styles.bodyTextWhite]}>
                        Lainassa: {currentlyLoanedAmount} kpl
                    </Text>
                </View>
                <Pressable onPress={(e) => handleSelection(e)}>
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

                {/* Rendered only for loans with just one loaned item */}
                {currentlyLoanedAmount <= 1 &&
                    <TouchableOpacity onPress={handleBrokenItemInfo}
                    >
                        <MaterialIcons
                            style={[styles.detailsGap]}
                            name="error-outline" size={40} color="#F4247C"
                        />
                    </TouchableOpacity>
                }
                <Animated.View
                    style={[styles.swipableView,
                    {
                        // animated transform
                        transform: [{ translateX: animation }],
                    }
                    ]}>

                    <View style={styles.loanDetails}>
                        <Pressable
                            style={[styles.swipableArrowContainer,]}
                            onPress={(e) => handleSwipeGesture(e)}>
                            <MaterialCommunityIcons
                                style={styles.iconPadding}
                                name="chevron-double-left"
                                size={20}
                                color="white" />
                        </Pressable>
                        {checked && 
                        <View style={[styles.innerContainer]}>
                                <View style={[styles.detailsColumn, styles.centerVertical]}>
                                <Text style={[styles.bodyTextWhite]}>
                                    Määrä
                                </Text>
                                <View style={[styles.flexRow, styles.detailsGap]}>
                                        <TextInput 
                                            style={[styles.returnInputField,
                                            !validInput ? { borderWidth: 1, borderColor: '#F4247C' } : ""]}
                                            placeholder="0"
                                        placeholderTextColor="#B4B4B4"
                                        keyboardType='number-pad'
                                            onChangeText={text => handleTextInput(text)}
                                            maxLength={6}
                                    />
                                    <Text style={[styles.bodyTextWhite, { marginLeft: 5 }]}>/ {currentlyLoanedAmount}</Text>
                                </View>
                            </View>
                            <View style={[styles.detailsColumn, styles.centerHorizontal, styles.centerVertical]}>
                                <Text style={[styles.bodyTextWhite]}>
                                    Huom.
                                </Text>
                                <TouchableOpacity onPress={handleBrokenItemInfo}
                                >
                                    <MaterialIcons
                                        style={[styles.detailsGap]}
                                        name="error-outline" size={40} color="#F4247C"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        }
                    </View>
                </Animated.View>
            </View>
        </View>
    )
}

export default LoanListItem;