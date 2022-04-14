import { View, Text, } from 'react-native'
import React from 'react'
import { confirmStyles as styles } from './ConfirmStyles'
import ConfirmIcon from './ConfirmIcon';
import ThemeButton from '../testing_field/ThemeButton';

const ConfirmScreen = ({ returnLoan }) => {
    const confirmText = returnLoan ? 'Palautus vahvistettu' : 'Lainaus vahvistettu';
    const buttonText = returnLoan ? 'Komponenttihaku' : 'Palaa hakuun';

    const handlePress = () => {
        // Route to wherever
        console.log('Press')
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
            <ThemeButton onPress={handlePress} color="#F4247C" text={buttonText} />
            <ThemeButton onPress={handlePress} color="#F4247C" text='Kotinäkymään' width='small' />
        </View >
    )
}

export default ConfirmScreen