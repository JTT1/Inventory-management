import { View, Text, Pressable, Animated, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { returnLoanStyles as styles } from './ReturnLoanStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const LoanListItem = ({ item, updateItemList, brokenItemList }) => {
    const [checked, setChecked] = useState(false);
    const [validInput, setValidInput] = useState(true);
    const [modalOpen, toggleModal] = useState(false);
    const [brokenItemDetails, setBrokenItemDetails] = useState('');
    const currentlyLoanedAmount = item.lainattuMaara - item.palautukset;
    const returnedBefore = item.palautukset;
    const animation = useRef(new Animated.Value(60)).current;
    const shouldAnimate = useRef(false);
    const itemCopy = { ...item };

    // Check box handler
    const handleSelection = () => {
        setChecked(!checked);

        // Add item to the list of items to be returned
        if (!checked) {
            updateItemList.push(itemCopy);

            const index = updateItemList.findIndex(itemCopy => {
                return itemCopy.ID === item.ID;
            });

            if (currentlyLoanedAmount <= 1) {
                updateItemList[index].palautukset = returnedBefore + 1;
                updateItemList[index].palautettuKokonaan = true;
            }
        } else {
            // remove when unchecked
            updateItemList.splice(updateItemList.indexOf(itemCopy));
        }
        if (currentlyLoanedAmount > 1) { // if multiple items bound to a loan, show additional functionalities
            toggleSwipeSuggestion();
        }
        if (checked) {
            setBrokenItemDetails('');
            brokenItemList.some((elem) => {
                if (elem.itemID === item.ID) {
                    brokenItemList.pop(elem)
                    return
                }
            })
        }
    }

    // Amount validation and handling 
    const handleTextInput = (text) => {
        setValidInput(true);

        const index = updateItemList.findIndex(itemCopy => {
            return itemCopy.ID === item.ID;
        });

        // If higher amount than currently loaned
        if (Number(text) > currentlyLoanedAmount) {
            setValidInput(false);
            updateItemList[index].palautukset = currentlyLoanedAmount;
            return
        } else {
            updateItemList[index].palautukset = returnedBefore + Number(text);
            if (updateItemList[index].palautukset === updateItemList[index].lainattuMaara) {
                updateItemList[index].palautettuKokonaan = true;
            }
            else {
                updateItemList[index].palautettuKokonaan = false;
            }
        }
    }

    // When swiped left
    const handleSwipeGesture = (e) => {
        shouldAnimate.current = !shouldAnimate.current;
        toggleReturnDetails();
    }

    const handleBrokenItemInfo = () => {
        toggleModal(true);

        if (brokenItemList.some((elem) => elem.itemID === item.ID)) {
            return
        }

        const brokenItem = {
            user: itemCopy.userID,
            itemID: itemCopy.ID,
            description: brokenItemDetails,
        }
        brokenItemList.push(brokenItem)
    }

    const handleBrokenItemDetails = (input) => {
        setBrokenItemDetails(input);
    }

    const handleSave = () => {
        toggleModal(!modalOpen);
        brokenItemList.some((elem) => {
            if (elem.itemID === item.ID) {
                elem.description = brokenItemDetails
            }
        })
    }

    const handleCancel = () => {
        toggleModal(!modalOpen);
        setBrokenItemDetails('');
        brokenItemList.some((elem) => {
            if (elem.itemID === item.ID) {
                brokenItemList.pop(elem)
                return
            }
        })
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

    const additionalInfoButton =
        brokenItemDetails.length > 0
            ? <MaterialIcons
                style={[styles.detailsGap]}
                name="error-outline" size={40} color="#F4247C"
            />
            :
            <MaterialIcons
                style={[styles.detailsGap]}
                name="error-outline" size={40} color="#C4C4C4"
            />


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
                        {additionalInfoButton}
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
                                        Ilmoita vika
                                </Text>
                                <TouchableOpacity onPress={handleBrokenItemInfo}
                                >
                                        {additionalInfoButton}
                                </TouchableOpacity>
                            </View>
                        </View>
                        }
                    </View>
                </Animated.View>
            </View>
            <Modal
                style={[styles.centerHorizontal]}
                isVisible={modalOpen}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
            >
                <Text style={[styles.h2]}>Ilmoita rikkinäiseksi</Text>
                <View style={[styles.boxShadow, styles.brokenItemInput]}>
                    <TextInput style={[styles.bodyTextWhite]}
                        maxLength={255}
                        multiline
                        onChangeText={text => handleBrokenItemDetails(text)}
                        value={brokenItemDetails}
                        keyboardType='default'
                        clearTextOnFocus={true}
                    />
                </View>
                <View style={styles.flexRow}>
                    <TouchableOpacity onPress={handleSave} style={[styles.cancelFAB, styles.flexRow]}>
                        <View style={[styles.saveButton]}>
                            <Text style={[styles.h2, styles.bodyTextDark]}>Tallenna</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCancel} style={[styles.cancelFAB, styles.flexRow]}>
                        <MaterialIcons name="close" size={30} color="white" />
                        <Text style={[styles.bodyTextWhite]}>Peruuta</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default LoanListItem;