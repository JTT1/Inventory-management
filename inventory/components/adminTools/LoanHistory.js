import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AdminStyles as styles } from './AdminStyles';
import { fetchAllLoans } from '../../helpers/firebaseFunctions';
import LoanHistoryList from './LoanHistoryList';

const LoanHistory = ({ navigation }) => {
    const [loans, setLoans] = useState([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        (async () => {
            fetchAllLoans()
                .then((res) => {
                    setLoans(res);
                    setLoaded(true);
                })
        })();
    }, [])

    const renderLoanList = loans.map((item) => {
        return <LoanHistoryList key={item.ID} item={item} />
    });

    return (
        <View style={[styles.container, styles.centerVertical]}>
            <Text style={[styles.h2, styles.selfcenterVertical]}>
                Lainaushistoria
            </Text>
            {loaded ? 
            <View style={[styles.userListContainer, styles.stretch, styles.boxShadow]}>
                <ScrollView>
                    {renderLoanList}
                </ScrollView>
            </View>
                : <ActivityIndicator size={100} color="#1DFFBB" />}
        </View>
            
        
    )
    }

export default LoanHistory;