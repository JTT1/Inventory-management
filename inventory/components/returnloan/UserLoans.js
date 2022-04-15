import { View, ScrollView } from 'react-native';
import React from 'react';
import LoanListItem from './LoanListItem';
import ThemeButton from '../testing_field/ThemeButton';
import { returnLoanStyles as styles } from './ReturnLoanStyles';

const UserLoans = () => {
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
            Lisatietoa: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            Maara: "50",
            Nimike: "SMC Tyokaluvaihtoyksikko MA310-S1-Y59AL",
            Sijainti: "Robotiikkalabra",
            Tarjotin: "Työkalut",
        },
    ]

    const list = loanedItems.map((item) => item);
    const renderList = list.map((item) => <LoanListItem item={item} />);

    // Handle loan return
    const handleReturn = () => {
        console.log('press')
    }

    return (
        <ScrollView>

            <View style={[styles.container, styles.boxShadow]}>
                {renderList}
                <ThemeButton color="#F4247C" text="Palauta valitut" onPress={handleReturn} />
            </View>
        </ScrollView>

    )
}

export default UserLoans