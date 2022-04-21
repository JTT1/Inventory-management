import React, { useState } from "react";
import { TextInput, View, Text, Alert, Button } from "react-native";
import { styles } from "../../styles/AppRootStyle";

export default function Testing() {
    const [muuttuja, setMuuttuja] = useState("");


    const check = () => {
        if (!muuttuja.includes('tere')) {
          Alert.alert("terve!");
          return false;
        }
    return true;
    }


    return (

        <View style={styles.container}>
            <Text>testi</Text>
            <TextInput
                placeholder ="testi"
                onChangeText={setMuuttuja}
            />
            <Button 
            title="Terve"
            onPress={check}
            />

            
        </View>
    )

}