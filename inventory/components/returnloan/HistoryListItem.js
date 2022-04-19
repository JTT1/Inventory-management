import { View, Text } from 'react-native'
import React from 'react'
import { returnLoanStyles as styles } from './ReturnLoanStyles';

const HistoryListItem = ({ item }) => {
    return (
        <View style={[styles.loanListItem, styles.stretch]}>
            <View>
                <Text style={[styles.bodyTextWhite]}>
                    {item.komponentti}
                </Text>
                <Text style={[styles.bodyTextWhite]}>
                    {item.palautusPvm}
                </Text>
            </View>
        </View>
    )
}

export default HistoryListItem