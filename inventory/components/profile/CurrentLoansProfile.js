import { View, Text } from 'react-native';
import { profileStyles as styles } from './profileStyles';


const CurrentLoansProfile = ({ item }) => {

    const currentlyLoanedAmount = item.lainattuMaara - item.palautukset;
    
    return (
        <View style={styles.loanListItem}>
            <View style={[styles.flexRow, styles.stretch]}>
                <View style={styles.loanedItemName}>
                    <Text style={[styles.bodyTextWhite, styles.h4,]}>
                        {item.komponentti}
                    </Text>

                    <Text style={[styles.bodyTextWhite]}>Projekti: {item.projekti}</Text>
                    <Text style={[styles.bodyTextWhite]}>
                        Lainassa: {currentlyLoanedAmount} kpl
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default CurrentLoansProfile;