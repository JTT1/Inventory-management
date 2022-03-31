import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { db, ROOT_REF } from '../firebase/Config';


export const Components = ({ component: { item: title, done }, id }) => {
    const [doneState, setDone] = useState(done);

    const onCheck = () => {
        setDone(!doneState);
        db.ref(ROOT_REF).update({
            [id]: {
                item: title,
                done: !doneState,
            },
        });
    };

    const onRemove = () => {
        db.ref(ROOT_REF + [id]).remove();
    };




    return (
        <View style={styles.component}>
            <Pressable onPress={onCheck}>
                {doneState ? <MaterialIcons name={'check-box'} size={32} />
                    : <MaterialIcons name={'check-box-outline-blank'} size={32} />}
            </Pressable>
            <Text onPress={onCheck}
                style={
                    [styles.componentText,
                    { backgroundColor: doneState ? "lightgreen" : "lightblue" }]}>{title}
            </Text>

            <Pressable>
                <Entypo name={'trash'} size={32} onPress={onRemove} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    component: {
        width: 300,
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    },
    componentText: {
        borderColor: '#afafaf',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        marginLeft: 10,
        minWidth: '60%'
    },
})