import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { confirmStyles as styles } from './ConfirmStyles'
import ConfirmIcon from './ConfirmIcon';
import ThemeButton from '../testing_field/ThemeButton';

const ConfirmScreen = ({ navigation, route }) => {
    const confirmText = route.params.returnLoan ? 'Palautus vahvistettu' : 'Lainaus vahvistettu';
    const buttonText = route.params.returnLoan ? 'Komponenttihaku' : 'Palaa hakuun';

    const handlePress = () => {
        navigation.reset({
            index: 1,
            routes: [{ name: 'Koti' }, { name: 'Haku' }],
        })
    }
    const handlePressHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Koti' }],
        })
    }

    return (
        <ScrollView contentContainerStyle={[styles.container, styles.confirmScreenContainer]}>
            <View>
                <ConfirmIcon />
            </View>
            <Text style={[styles.bodyTextWhite, styles.h1, styles.confirmationText]}>
                {confirmText}
            </Text>

            <View>
                <Text style={[styles.bodyTextWhite, { alignSelf: 'center' }]}>
                Lainaamassa lisää?
            </Text>
            <ThemeButton onPress={handlePress} color="#F4247C" text={buttonText} />
                <ThemeButton onPress={handlePressHome} color="#F4247C" text='Kotinäkymään' width='small' />
            </View>
        </ScrollView >
    )
}

export default ConfirmScreen