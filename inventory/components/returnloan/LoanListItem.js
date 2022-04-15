import { View, Text, Pressable, Animated, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef, } from 'react';
import { returnLoanStyles as styles } from './ReturnLoanStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const LoanListItem = ({ item }) => {
    const [checked, setChecked] = useState(false);
    const [amount, setAmount] = useState("");
    const animation = useRef(new Animated.Value(60)).current;
    const shouldAnimate = useRef(false);
    const checkBoxRef = useRef(false);


    // When check box is checked
    const handleSelection = (e) => {
        setChecked(!checked);
        if (item.lainattuMaara > 1) {
            checkBoxRef.current = !checkBoxRef.current;
            toggleSwipeSuggestion();
        }
    }

    // When swiped left
    const handleSwipeGesture = (e) => {
        shouldAnimate.current = !shouldAnimate.current;
        toggleReturnDetails();
    }

    const handleBrokenItemInfo = () => {

        console.log('im broken af')
    }


    const handleTextInput = (text) => {
        if (text > item.lainattuMaara) {
            console.log('ei pysty, liian hapokasta')
        } else {
            console.log(text)

        }
    }


    // animation functions
    const toggleSwipeSuggestion = () => {
        Animated.spring(animation, {
            // When checkbox checked -> animate X to 0
            toValue: checkBoxRef.current ? 15 : 60,
            friction: 6,
            tension: 50,
            useNativeDriver: false,
        }).start();
    }

    const toggleReturnDetails = () => {
        Animated.spring(animation, {
            // When checkbox checked -> animate X to 0
            toValue: shouldAnimate.current ? -Dimensions.get('window').width / 1.5 : 15,
            friction: 6,
            tension: 50,
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
                        Lainassa: {item.lainattuMaara} kpl
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
                        </View>}
                </Pressable>

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
                        <View style={[styles.innerContainer]}>
                            <View style={[styles.detailsColumn, styles.centerVertical]}>

                                <Text style={[styles.bodyTextWhite]}>
                                    Määrä
                                </Text>
                                <View style={[styles.flexRow, styles.detailsGap]}>
                                    <TextInput
                                        style={styles.returnInputField}
                                        placeholder="1"
                                        placeholderTextColor="#B4B4B4"
                                        keyboardType='number-pad'
                                        onChangeText={(text) => handleTextInput(text)}
                                    />
                                    <Text style={[styles.bodyTextWhite, { marginLeft: 5 }]}>/ {item.lainattuMaara}</Text>
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
                    </View>
                </Animated.View>
            </View>
        </View>
    )
}

export default LoanListItem;