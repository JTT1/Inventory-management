import { ScrollView, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import LoanListItem from './LoanListItem';
import ThemeButton from '../testing_field/ThemeButton';
import { returnLoanStyles as styles } from './ReturnLoanStyles';
import uuid from 'react-uuid';
import { getCurrentUserLoans, updateUserLoans } from '../../helpers/firebaseFunctions';
import Modal from 'react-native-modal';
import HistoryListItem from './HistoryListItem';
import { MaterialIcons } from '@expo/vector-icons';
import { UserContext } from '../context/userContext.js';



const CurrentLoans = ({ navigation }) => {
    const [keys, setKeys] = useState([]);
    const [loanData, setLoanData] = useState([]);
    const [modalVisible, toggleModal] = useState(false);
    let updateItemList = [];


    // Get the real user id from login information
    const user = useContext(UserContext);
    const [key] = Object.keys(user);
    const userId = key;


    useEffect(() => {
        getCurrentUserLoans(setLoanData, setKeys, userId);
        return () => {
            setLoanData([]);
            setKeys([]);
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
                    return <LoanListItem updateItemList={updateItemList} item={item} key={uuid()} />
                }
            });

    // User's loan history
    const returnedLoans = loanData
        .filter(loan =>
            loan.palautettuKokonaan
        )
        .map((item) => <HistoryListItem item={item} key={uuid()} />);

    // Handle loan return, possibly redirect as well
    const handleReturnItems = () => {

        console.log(updateItemList)
        updateItemList.forEach((item) => updateUserLoans(item));
        // updateItemList = [];

        // route
        // navigation.navigate('Vahvistus', {
        //     returnLoan: true
        // })
    };

    return (
        <ScrollView contentContainerStyle={[styles.container]}>
            <Text style={[styles.h2, { textAlign: 'center', marginBottom: 20 }]}>
                Palauta komponentteja
            </Text>
            <ScrollView>
                {userLoans}
            </ScrollView>
            <TouchableOpacity
                style={[styles.flexRow, styles.centerVertical, { marginTop: 10 }]}
                onPress={() => toggleModal(!modalVisible)}>

                <MaterialIcons name="history" size={30} color="white" />
                <Text style={[styles.bodyTextWhite, { marginLeft: 5 }]}>
                    Palautetut lainat
                </Text>
            </TouchableOpacity>
            <ThemeButton style={{ marginBottom: 20 }} color="#F4247C" text="Palauta valitut" onPress={handleReturnItems} />

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
                <ScrollView>
                    {returnedLoans}
                </ScrollView>
                <TouchableOpacity onPress={() => toggleModal(!modalVisible)} style={[styles.cancelFAB]}>
                    <MaterialIcons name="close" size={30} color="white" />
                    <Text style={[styles.bodyTextWhite]}>Sulje</Text>

                </TouchableOpacity>
            </Modal>
        </ScrollView >
    )
};

export default CurrentLoans;