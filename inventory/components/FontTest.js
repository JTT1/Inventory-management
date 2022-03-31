import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
    const [loaded] = useFonts({
        Quicksand: require('./assets/fonts/Quicksand400Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }
    else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.text}>Testing Quicksand</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        fontSize: 30,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Quicksand',
        fontSize: 30,
    }
});
