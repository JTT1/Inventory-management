import { View, Text } from 'react-native'
import React from 'react'
import { returnLoanStyles as styles } from './ReturnLoanStyles';

const HistoryListItem = ({ item }) => {
    return (
        <View style={[styles.historyListItem]}>
            <View style={[styles.stretch]}>
                <Text style={[styles.bodyTextWhite, styles.h4]}>
                    {item.komponentti}
                </Text>
                <Text style={[styles.bodyTextWhite]}>
                    Projekti: {item.projekti}
                </Text>
                <Text style={[styles.bodyTextWhite]}>
                    Palautettu: {item.palautusPvm}
                </Text>
            </View>
        </View>
    )
}

export default HistoryListItem