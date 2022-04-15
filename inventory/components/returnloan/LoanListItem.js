import { View, Text } from 'react-native';
import React from 'react';
import { returnLoanStyles as styles } from './ReturnLoanStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoanListItem = ({ item }) => {

    return (
        <View style={styles.loanListItem}>
            <View style={[styles.flexRow, { height: 75 }]}>
                <View style={styles.flexCol}>
                    <Text style={[styles.bodyTextWhite, styles.h3]}>
                        {item.Nimike}
                    </Text>
                    {/* <Text style={[styles.bodyTextWhite]}>
                    {item.Maara}
                </Text> */}

                </View>
                <View>
                    <MaterialIcons name="check-box-outline-blank" size={24} color="white" />
                </View>
                <View>
                    <MaterialCommunityIcons name="chevron-double-left" size={24} color="white" />
                </View>
            </View>
        </View>
    )
}

export default LoanListItem;