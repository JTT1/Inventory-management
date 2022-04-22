import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import LoanListItem from './LoanListItem';
import ThemeButton from '../testing_field/ThemeButton';
import { returnLoanStyles as styles } from './ReturnLoanStyles';
import uuid from 'react-uuid';
import { getCurrentUserLoans, updateUserLoans, addNewBrokenItem } from '../../helpers/firebaseFunctions';
import Modal from 'react-native-modal';
import HistoryListItem from './HistoryListItem';
import { MaterialIcons } from '@expo/vector-icons';
import { UserContext } from '../context/userContext';

// Note to self
// hae firebasesta userin data tähän komponenttiin -> renderöityyn listaan pitäs saada lainan/noden ID mukaan

const CurrentLoans = ({ navigation }) => {
    const [loaded, setIsLoaded] = useState(false);
    const [loanData, setLoanData] = useState([]);
    const [modalVisible, toggleModal] = useState(false);
    let updateItemList = [];
    let brokenItemList = [];

    // Get the real user id from login information
    const user = useContext(UserContext);
    const [key] = Object.keys(user);
    const userId = key;

    useEffect(() => {
        getCurrentUserLoans(setLoanData, setIsLoaded, userId);
        return () => {
            setLoanData([]);
            setIsLoaded(false);
        }
    }, [])

    // Render user loans
    const userLoans =
        loanData.every((item) => item.palautettuKokonaan === true) // If user's every loan is fully returned
            ? <Text style={[styles.bodyTextWhite, { alignSelf: 'center' }]} >Ei aktiivisia lainoja.</Text>
            : loanData.map((item) => { // Active loans
                if (!item.palautettuKokonaan) {
                    return <LoanListItem updateItemList={updateItemList} brokenItemList={brokenItemList} item={item} key={uuid()} />
                }
            });

    // User's loan history
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

        try {
        updateItemList.forEach((item) => updateUserLoans(item));
            brokenItemList.forEach((item) => addNewBrokenItem(item));
        } catch (error) {
            // console.log(error)
            return
        }
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

            {/* Loan history modal */}
            <Modal
                style={[styles.centerHorizontal]}
                isVisible={modalVisible}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
            >
                <Text style={[styles.bodyTextWhite, styles.h3, { alignSelf: 'center' }]}>
                    Lainaushistoria
                </Text>
                {loanHistory.length > 0
                    ?
                    <ScrollView style={[styles.historyListContainer]}>
                        {loanHistory}
                    </ScrollView>
                    :
                    <View>
                        <Text style={[styles.bodyTextWhite, styles.h4, { alignSelf: 'center', marginBottom: 20 }]}>Ei palautettuja lainoja.</Text>
                    </View>
                }
                <TouchableOpacity style={[styles.flexRow, { marginTop: 10 }]} onPress={() => toggleModal(!modalVisible)}>
                    <View style={styles.closeButton}>
                    <MaterialIcons name="close" size={30} color="white" />
                    </View>
                    <Text style={[styles.bodyTextWhite]}>
                        Sulje
                    </Text>
                </TouchableOpacity>
            </Modal>
        </ScrollView >
    )
};

export default CurrentLoans;