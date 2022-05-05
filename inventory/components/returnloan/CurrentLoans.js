import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Text, ActivityIndicator, Alert } from 'react-native';
import LoanListItem from './LoanListItem';
import ThemeButton from '../testing_field/ThemeButton';
import { returnLoanStyles as styles } from './ReturnLoanStyles';
import uuid from 'react-uuid';
import { getCurrentUserLoans, updateUserLoans, addNewBrokenItem, updateItemAmount, fetchTrays2 } from '../../helpers/firebaseFunctions';
import { UserContext } from '../context/userContext';

const CurrentLoans = ({ navigation }) => {
    const [loaded, setIsLoaded] = useState(false);
    const [loanData, setLoanData] = useState([]);
    const [trays, setTrays] = useState([]);
    let updateItemList = [];
    let brokenItemList = [];
    const { user } = useContext(UserContext);
    const userId = user.ID;

    useEffect(() => {
        getCurrentUserLoans(setLoanData, setIsLoaded, userId);
        fetchTrays2(setTrays)
        return () => {
            setLoanData([]);
            setIsLoaded(false);
        }
    }, [])


    // Render user loans
    const userLoans =
        loanData.every((item) => item.palautettuKokonaan === true) // If user's every loan is fully returned
            ? <Text style={[styles.bodyTextWhite, styles.selfCenterHorizontal]} >Ei aktiivisia lainoja.</Text>
            : loanData.map((item) => { // Active loans
                if (!item.palautettuKokonaan) {
                    return <LoanListItem updateItemList={updateItemList} brokenItemList={brokenItemList} item={item} key={uuid()} trays={trays} />
                }
            });

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
            updateItemList.forEach((item) => {
                let backToInventory = {
                    'ID': item.komponenttiID,
                    'maara': item.thisReturnAmount
                }
                updateItemAmount(backToInventory, { add: true })
            })
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
            {userLoans.length > 0 && <ThemeButton style={{ marginBottom: 20, }} color="#F4247C" text="Palauta valitut" onPress={handleReturnItems} />}
        </ScrollView >
    )
};

export default CurrentLoans;