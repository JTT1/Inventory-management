import { View, ScrollView, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import LoanListItem from './LoanListItem';
import ThemeButton from '../testing_field/ThemeButton';
import { returnLoanStyles as styles } from './ReturnLoanStyles';
import uuid from 'react-uuid';
import { getCurrentUserLoans } from '../../helpers/firebaseFunctions';

const CurrentLoans = ({ navigation }) => {
    const [loanData, setLoanData] = useState([]);
    const renderList = loanData.map((item) => <LoanListItem item={item} key={uuid()} />);

    useEffect(() => {
        getCurrentUserLoans(setLoanData);
    }, [])

    // Handle loan return
    const handleReturnItems = () => {
        // route
        navigation.push('Vahvistus', {
            returnLoan: true
        })
    }

    return (
        <ScrollView contentContainerStyle={[styles.container]}>
            <Text style={[styles.h2, { textAlign: 'center', marginBottom: 20 }]}>
                Palauta komponentteja
            </Text>

            <ScrollView>
                {renderList}
            </ScrollView>
            <ThemeButton style={{ marginBottom: 20 }} color="#F4247C" text="Palauta valitut" onPress={handleReturnItems} />
        </ScrollView >
    )
}

export default CurrentLoans;