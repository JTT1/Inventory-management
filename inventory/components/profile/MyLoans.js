import { ScrollView, Text, ActivityIndicator} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import CurrentLoansProfile from './CurrentLoansProfile';
import uuid from 'react-uuid';
import { getCurrentUserLoans } from '../../helpers/firebaseFunctions';
import HistoryListItem from '../returnloan/HistoryListItem';
import { profileStyles as styles } from './profileStyles'
import { UserContext } from '../context/userContext';




const MyLoans = () => {

    const [loaded, setIsLoaded] = useState(false);
    const [loanData, setLoanData] = useState([]);

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

    // User's active loans
    const userLoans =
        loanData.every((item) => item.palautettuKokonaan === true) // If user's every loan is fully returned
            ? <Text style={[styles.bodyTextWhite, { alignSelf: 'center' }]} >Ei aktiivisia lainoja.</Text>
            : loanData.map((item) => { // Active loans
                if (!item.palautettuKokonaan) {
                    return <CurrentLoansProfile updateItemList={updateItemList} brokenItemList={brokenItemList} item={item} key={uuid()}
                    />
                }
            });

    // User's loan history
    const loanHistory = loanData
        .filter(loan => loan.palautettuKokonaan)
        .map((item) =>
            <HistoryListItem item={item} key={uuid()} />
        );

    return (
        <ScrollView contentContainerStyle={[styles.container]}>

            <Text style={[styles.h2, { textAlign: 'center', marginBottom: 20 }]}>
                Aktiiviset Lainat
            </Text>
            <ScrollView>
                {!loaded ?
                    <ActivityIndicator size="large" color="#1DFFBB" />
                    : userLoans}
            </ScrollView>
    
            <Text style={[styles.h2, { textAlign: 'center', marginBottom: 20 }]}>
                Palautetut lainat
            </Text>
            <ScrollView>
                {!loaded ?
                    <ActivityIndicator size="large" color="#1DFFBB" />
                    : loanHistory}
            </ScrollView>

        </ScrollView >
    )
};

export default MyLoans;