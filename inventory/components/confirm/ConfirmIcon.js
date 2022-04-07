import { View } from 'react-native';
import React from 'react';
import { confirmStyles as styles } from './ConfirmStyles';
import { MaterialIcons } from '@expo/vector-icons';

const ConfirmIcon = () => {
    return (
        <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
            </View>
            <MaterialIcons
                name="check"
                size={225} color="#1DFFBB"
                style={styles.checkMark}
            />
        </View>

    )
}

export default ConfirmIcon