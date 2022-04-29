import React, { useState, useEffect, useContext, useMemo } from 'react';
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

const CurrentLoans = ({ navigation }) => {
    const [loaded, setIsLoaded] = useState(false);
    const [loanData, setLoanData] = useState([]);
    const [modalVisible, toggleModal] = useState(false);
    let updateItemList = [];
    let brokenItemList = [];

    // Get the real user id from login information
    const { user } = useContext(UserContext);
    const userId = user.ID;

    useEffect(() => {
        getCurrentUserLoans(setLoanData, setIsLoaded, userId);
        return () => {
            setLoanData([]);
            setIsLoaded(false);
        }
    }, [])


    // TODO
    const memoizedLoanList = useMemo(() => {
        return loanData.every((item) => item.palautettuKokonaan === true) // If user's every loan is fully returned
            ? <Text style={[styles.bodyTextWhite, { alignSelf: 'center' }]} >Ei aktiivisia lainoja.</Text>
            : loanData.map((item) => { // Active loans
                if (!item.palautettuKokonaan) {
                    return <LoanListItem updateItemList={updateItemList} brokenItemList={brokenItemList} item={item} key={uuid()}
                    />
                }
            });
    }, [loanData]);

    // Render user loans
    const userLoans =
        loanData.every((item) => item.palautettuKokonaan === true) // If user's every loan is fully returned
            ? <Text style={[styles.bodyTextWhite, { alignSelf: 'center' }]} >Ei aktiivisia lainoja.</Text>
            : loanData.map((item) => { // Active loans
                if (!item.palautettuKokonaan) {
                    return <LoanListItem updateItemList={updateItemList} brokenItemList={brokenItemList} item={item} key={uuid()}
                    />
                }
            });

    // User's loan history
    const loanHistory = loanData
        .filter(loan => loan.palautettuKokonaan)
        .map((item) =>
            <HistoryListItem item={item} key={uuid()} />
        );


    const validateReturn = () => {
        if (updateItemList.some((item) => item.validated === false)) {
            Alert.alert('', 'Tarkista palautuksen tiedot.')
            return false
        }

        if (updateItemList.length === 0 && brokenItemList.length === 0) {
            Alert.alert('', 'Valitse ainakin yksi komponentti palautettavaksi.')
            return false
        }
        else {
            return true
        }
    }

    // Handle loan return, and redirect to confirmation screen
    const handleReturnItems = () => {
        if (validateReturn() == true) {
        try {
            updateItemList.forEach((item) => updateUserLoans(item));
            brokenItemList.forEach((item) => addNewBrokenItem(item));
        } catch (error) {
            Alert.alert("Virhe", "Tietoja ei pystytty päivittämään.")
            return
        }
        navigation.navigate('Vahvistus', {
            returnLoan: true
        });
        }
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
                style={[styles.flexRow, styles.centerHorizontal, { marginTop: 10, marginBottom: 20 }]}
                onPress={() => toggleModal(!modalVisible)}>

                <MaterialIcons name="history" size={30} color="white" />
                <Text style={[styles.bodyTextWhite, { marginLeft: 5 }]}>
                    Palautetut lainat
                </Text>
            </TouchableOpacity>
            {userLoans.length > 0 &&
                <ThemeButton style={{ marginBottom: 20, }} color="#F4247C" text="Palauta valitut" onPress={handleReturnItems} />
            }
            {/* Loan history modal */}
            <Modal
                style={[styles.centerVertical, styles.centerHorizontal]}
                isVisible={modalVisible}
                onBackButtonPress={() => toggleModal(false)}
                animationIn={'fadeIn'}
                animationOut={'fadeOut'}
                hideModalContentWhileAnimating={true}
                useNativeDriver={true}
            >
                <Text style={[styles.bodyTextWhite, styles.h3]}>
                    Lainaushistoria
                </Text>
                {loanHistory.length > 0
                    ?
                    <ScrollView style={[styles.historyListContainer]}>
                        {loanHistory}
                    </ScrollView>
                    :
                    <View>
                        <Text style={[styles.bodyTextWhite, styles.h4, { marginBottom: 20 }]}>Ei palautettuja lainoja.</Text>
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