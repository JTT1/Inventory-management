import { ScrollView, Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import React, { useState, useEffect, useRef, } from 'react';
import LoanListItem from './LoanListItem';
import ThemeButton from '../testing_field/ThemeButton';
import { returnLoanStyles as styles } from './ReturnLoanStyles';
import uuid from 'react-uuid';
import { getCurrentUserLoans, updateUserLoans, addNewBrokenItem } from '../../helpers/firebaseFunctions';
import Modal from 'react-native-modal';
import HistoryListItem from './HistoryListItem';
import { MaterialIcons } from '@expo/vector-icons';


const CurrentLoans = ({ navigation }) => {
    const [loaded, setIsLoaded] = useState(false);
    const [loanData, setLoanData] = useState([]);
    const [modalVisible, toggleModal] = useState(false);
    let updateItemList = [];
    let brokenItemList = [];

    // Get the real user id from login information
    const userId = "1224";

    useEffect(() => {
        getCurrentUserLoans(setLoanData, userId);
        setIsLoaded(true);
        return () => {
            setLoanData([]);
            setIsLoaded(false);
        }
    }, [])

    // Render user's active loans
    const userLoans = 
        // If user's every loan is fully returned
        loanData.every((item) => item.palautettuKokonaan === true)
            ? <Text style={[styles.bodyTextWhite, { alignSelf: 'center' }]} >Ei aktiivisia lainoja.</Text>

            // If user has active loans
            : loanData.map((item) => {
                if (!item.palautettuKokonaan) {
                    return <LoanListItem updateItemList={updateItemList} brokenItemList={brokenItemList} item={item} key={uuid()} />
                }
            });

    // User's loan history (palautettuKokonaan == true)
    const loanHistory = loanData
        .filter(loan => loan.palautettuKokonaan)
        .map((item) =>
            <HistoryListItem item={item} key={uuid()} />
        );

    // Handle loan return, and redirect to confirmation screen
    const handleReturnItems = () => {
        if (updateItemList.length === 0 && brokenItemList.length === 0) {
            return
        };
        updateItemList.forEach((item) => updateUserLoans(item));
        brokenItemList.forEach((item) => addNewBrokenItem(item));

        navigation.navigate('Vahvistus', {
            returnLoan: true
        });
    };
    return (
        <ScrollView contentContainerStyle={[styles.container]}>
            <Text style={[styles.h2, { textAlign: 'center', marginBottom: 20 }]}>
                Palauta komponentteja
            </Text>
            <ScrollView>
                {!loaded ?
                    <ActivityIndicator size="large" color="#1DFFBB" />
                    : userLoans}
            </ScrollView>
            <TouchableOpacity
                style={[styles.flexRow, styles.centerVertical, { marginTop: 10 }]}
                onPress={() => toggleModal(!modalVisible)}>

                <MaterialIcons name="history" size={30} color="white" />
                <Text style={[styles.bodyTextWhite, { marginLeft: 5 }]}>
                    Palautetut lainat
                </Text>
            </TouchableOpacity>
            <ThemeButton style={{ marginBottom: 20, }} color="#F4247C" text="Palauta valitut" onPress={handleReturnItems} />
            <Modal
                style={[styles.centerHorizontal]}
                isVisible={modalVisible}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
            >
                <Text style={[styles.bodyTextWhite, styles.h3]}>
                    Lainaushistoria
                </Text>
                <ScrollView style={[styles.historyListContainer]}>
                    {loanHistory}
                </ScrollView>
                <TouchableOpacity onPress={() => toggleModal(!modalVisible)}>
                    <MaterialIcons name="close" size={30} color="white" />
                    <Text style={[styles.bodyTextWhite]}>Sulje</Text>
                </TouchableOpacity>
            </Modal>
        </ScrollView >
    )
};

export default CurrentLoans;