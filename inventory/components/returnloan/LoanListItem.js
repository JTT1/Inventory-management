import { View, Text, Pressable, Animated, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { returnLoanStyles as styles } from './ReturnLoanStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const LoanListItem = ({ item, updateItemList, brokenItemList, trays }) => {
    const [checked, setChecked] = useState(false);
    const [validInput, setValidInput] = useState(true);
    const [modalOpen, toggleModal] = useState(false);
    const [brokenItemDetails, setBrokenItemDetails] = useState('');
    const [itemTray, setItemTray] = useState({});
    const [loaded, setLoaded] = useState(false);
    const currentlyLoanedAmount = item.lainattuMaara - item.palautukset;
    const animation = useRef(new Animated.Value(60)).current;
    const shouldAnimate = useRef(false);
    const itemCopy = { ...item, validated: false, thisReturnAmount: 0 };
    const inputRef = useRef();
    const returnedBefore = item.palautukset;

    useEffect(() => {
        const correctTrayArr = trays.map((tray) => tray).filter(tray => {
            return tray.trayItems.includes(item.komponenttiID)
        });
        const tray = correctTrayArr[0];
        setItemTray(tray)
        setLoaded(true)
    }, [])

    // Check box handler
    const handleSelection = () => {
        // toggle state
        setChecked(!checked);

        // Add item to the list of items to be returned
        if (!checked) {
            updateItemList.push(itemCopy);

            const index = updateItemList.findIndex(itemCopy => {
                return itemCopy.ID === item.ID;
            });

            if (currentlyLoanedAmount <= 1) {
                updateItemList[index].palautukset = updateItemList[index].lainattuMaara;
                updateItemList[index].palautettuKokonaan = true;
                updateItemList[index].validated = true;
                updateItemList[index].thisReturnAmount = 1;

            }
        } else {
            setValidInput(true);
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

        // Get the correct object from the updateItemList[index]
        const index = updateItemList.findIndex(itemCopy => itemCopy.ID === item.ID);

        // If higher amount than currently loaned
        if (Number(text) > currentlyLoanedAmount) {
            setValidInput(false);
            updateItemList[index].palautukset = itemCopy.lainattuMaara;
            updateItemList[index].palautettuKokonaan = true;
            updateItemList[index].validated = false;
        } else {
            updateItemList[index].palautukset = returnedBefore + Number(text);
            updateItemList[index].validated = true;
            updateItemList[index].thisReturnAmount = Number(text);
            if (updateItemList[index].palautukset === updateItemList[index].lainattuMaara) {
                updateItemList[index].palautettuKokonaan = true;
            }
            else {
                updateItemList[index].palautettuKokonaan = false;
            }
        }
    }

    // When swiped left
    const handleSwipeGesture = () => {
        shouldAnimate.current = !shouldAnimate.current;
        toggleReturnDetails();
    }

    const handleBrokenItemInfo = () => {
        toggleModal(true);

        if (brokenItemList.some((elem) => elem.itemID === item.ID)) {
            return
        }

        const brokenItem = {
            user: itemCopy.userEmail,
            itemID: itemCopy.ID,
            komponentti: itemCopy.komponentti,
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
            toValue: !checked ? 20 : 100,
            friction: 7,
            tension: 70,
            useNativeDriver: false,
        }).start();
    }

    const toggleReturnDetails = () => {
        Animated.spring(animation, {
            // When checkbox checked -> animate X to 0
            toValue: shouldAnimate.current ? -Dimensions.get('window').width / 1.5 : 20,
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
                    <Text style={[styles.bodyTextWhite, styles.h4]}>
                        {item.komponentti}
                    </Text>

                    <Text style={[styles.bodyTextWhite]}>Projekti: {item.projekti}</Text>
                    <Text style={[styles.bodyTextWhite]}>
                        Lainassa: {currentlyLoanedAmount} kpl
                    </Text>

                    {itemTray == undefined ? <Text style={[styles.bodyTextWhite]}>Ei sijaintia</Text>
                        :
                        <Text style={[styles.bodyTextWhite]}> Sijainti: kaappi {itemTray.kaappi} ovi {itemTray.ovi}</Text>
                    }
                </View>
                <Pressable onPress={handleSelection}>
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
                                <View style={[styles.detailsColumn, styles.centerHorizontal]}>
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
                style={[styles.centerVertical]}
                isVisible={modalOpen}
                onBackButtonPress={handleCancel}
                onModalShow={() => inputRef.current.focus()}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
            >
                
                <View style={[styles.modalBox, styles.centerHorizontal, styles.centerVertical]}>
                <Text style={[styles.h2]}>Ilmoita rikkinäiseksi</Text>
                <Pressable onPress={() => inputRef.current.focus()}
                    style={[styles.brokenItemInput]}
                >
                    <TextInput style={[styles.bodyTextWhite]}
                        ref={inputRef}
                        maxLength={255}
                        multiline
                        onChangeText={text => handleBrokenItemDetails(text)}
                        value={brokenItemDetails}
                        keyboardType='default'
                        clearTextOnFocus={true}
                        onSubmitEditing={handleSave}
                        blurOnSubmit={true}
                    />
                </Pressable>
                <View style={styles.flexRow}>
                    <TouchableOpacity onPress={handleSave} style={[styles.flexRow]}>
                        <View style={[styles.saveButton]}>
                            <Text style={[styles.bodyTextDark, styles.h4, styles.textCenter]}>Tallenna</Text>
                        </View>
                    </TouchableOpacity>
                        <TouchableOpacity onPress={handleCancel} style={[styles.flexRow]}>
                        <View style={[styles.cancelButton]}>
                        <Text style={[styles.bodyTextWhite, styles.h4, styles.textCenter]}>Peruuta</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </View>
    )
}

export default LoanListItem;