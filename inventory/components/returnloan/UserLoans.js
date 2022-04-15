import { View, ScrollView, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import LoanListItem from './LoanListItem';
import ThemeButton from '../testing_field/ThemeButton';
import { returnLoanStyles as styles } from './ReturnLoanStyles';
import uuid from 'react-uuid';
import { getCurrentUserLoans } from '../../helpers/firebaseFunctions';

const UserLoans = () => {
    const [userLoans, setUserLoans] = useState([]);
    const loanedItems = [
        {
            Lisatietoa: "Yhteensopivuusongelmia robotiqin laitteiden kanssa. Toimii vain UR10e",
            Maara: "5",
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "TF103",
            Tarjotin: "Painonapit",
        },
        {
            Lisatietoa: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            Maara: "1",
            Nimike: "SMC Tyokaluvaihtoyksikko MA310-S1-Y59AL",
            Sijainti: "Robotiikkalabra",
            Tarjotin: "Työkalut",
        },
        {
            Lisatietoa: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            Maara: "50",
            Nimike: "SMC Tyokaluvaihtoyksikko MA310-S1-Y59AL",
            Sijainti: "Robotiikkalabra",
            Tarjotin: "Työkalut",
        },
        {
            Lisatietoa: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            Maara: "50",
            Nimike: "SMC Tyokaluvaihtoyksikko MA310-S1-Y59AL",
            Sijainti: "Robotiikkalabra",
            Tarjotin: "Työkalut",
        },
        {
            Lisatietoa: "Yhteensopivuusongelmia robotiqin laitteiden kanssa. Toimii vain UR10e",
            Maara: "5",
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "TF103",
            Tarjotin: "Painonapit",
        },
        {
            Lisatietoa: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            Maara: "50",
            Nimike: "SMC Tyokaluvaihtoyksikko MA310-S1-Y59AL",
            Sijainti: "Robotiikkalabra",
            Tarjotin: "Työkalut",
        }, {
            Lisatietoa: "Yhteensopivuusongelmia robotiqin laitteiden kanssa. Toimii vain UR10e",
            Maara: "5",
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "TF103",
            Tarjotin: "Painonapit",
        },
        {
            Lisatietoa: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            Maara: "50",
            Nimike: "SMC Tyokaluvaihtoyksikko MA310-S1-Y59AL",
            Sijainti: "Robotiikkalabra",
            Tarjotin: "Työkalut",
        }, {
            Lisatietoa: "Yhteensopivuusongelmia robotiqin laitteiden kanssa. Toimii vain UR10e",
            Maara: "5",
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "TF103",
            Tarjotin: "Painonapit",
        },
        {
            Lisatietoa: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            Maara: "50",
            Nimike: "SMC Tyokaluvaihtoyksikko MA310-S1-Y59AL",
            Sijainti: "Robotiikkalabra",
            Tarjotin: "Työkalut",
        }, {
            Lisatietoa: "Yhteensopivuusongelmia robotiqin laitteiden kanssa. Toimii vain UR10e",
            Maara: "5",
            Nimike: "Onrobot kolmisormitarttuja 3FG15",
            Sijainti: "TF103",
            Tarjotin: "Painonapit",
        },
        {
            Lisatietoa: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            Maara: "50",
            Nimike: "SMC Tyokaluvaihtoyksikko MA310-S1-Y59AL",
            Sijainti: "Robotiikkalabra",
            Tarjotin: "Työkalut",
        },
    ]
    const list = userLoans.map((item) => item);
    const renderList = userLoans.map((item) => <LoanListItem item={item} key={uuid()} />);

    useEffect(() => {
        getCurrentUserLoans(setUserLoans);
    }, [])

    // Handle loan return
    const handleReturnItems = () => {
        console.log('press')
        console.log(userLoans)
    }

    return (
        <ScrollView contentContainerStyle={[styles.container]}>
            <Text style={[styles.h2, { textAlign: 'center', marginBottom: 20 }]}>
                Palauta komponentteja
            </Text>

            <ScrollView>
                {renderList}
            </ScrollView>
            <ThemeButton color="#F4247C" text="Palauta valitut" onPress={handleReturnItems} />
        </ScrollView>
    )
}

export default UserLoans