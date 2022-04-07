import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { confirmStyles as styles } from './ConfirmStyles'
import ConfirmIcon from './ConfirmIcon';

const ConfirmScreen = ({ returnLoan }) => {
    const confirmText = returnLoan ? 'Palautus vahvistettu' : 'Lainaus vahvistettu';
    const buttonText = returnLoan ? 'Komponenttihaku' : 'Palaa hakuun';

    function handlePress() {
        // Route to wherever
        console.log('pressed')
    }

    return (
        <View style={styles.confirmScreenContainer}>
            <View>
                <ConfirmIcon />
            </View>
            <Text style={[styles.bodyTextWhite, styles.h1, styles.confirmationText]}>
                {confirmText}
            </Text>
            <Text style={[styles.bodyTextWhite]}>
                Lainaamassa lisää?
            </Text>
            <TouchableOpacity
                style={[styles.button, styles.boxShadow]}
                onPress={handlePress}
            >
                <Text style={[styles.bodyTextWhite, styles.h4, styles.upperCase]}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.buttonSmaller, styles.boxShadow]}
                onPress={handlePress}
            >
                <Text style={[styles.bodyTextWhite, styles.h4, styles.upperCase]}>
                    Kotinäkymään
                </Text>
            </TouchableOpacity>
        </View >
    )
}

export default ConfirmScreen