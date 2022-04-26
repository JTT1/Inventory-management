import React, { useContext } from "react";
import {Text, View, TouchableOpacity} from 'react-native';
import { AdminBarStyles as styles } from './AdminBarStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from "../context/userContext";




export default function AdminBar ({ navigation }) {
    const { user } = useContext(UserContext);


    if (user.rooli == "admin") {
        return (
            <View>
                
                <View style= {[styles.flexRow,styles.adminContainer, styles.centerVertical, styles.boxShadow]}>
                    <Text style={[styles.h4, styles.adminText]}>Admin</Text>
                    
                    <TouchableOpacity>
                    <MaterialCommunityIcons style={[styles.adminIcons, styles.boxShadow]} name="file-search-outline" size={30} color="#FFFFFF" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('Lisää')}>
                    <MaterialCommunityIcons style={[styles.adminIcons, styles.boxShadow]} name="plus" size={30} color="#FFFFFF" />
                    </TouchableOpacity>
    
                    <TouchableOpacity>
                    <MaterialCommunityIcons style={[styles.adminIcons, styles.boxShadow]} name="account-multiple" size={30} color="#FFFFFF" />
                    </TouchableOpacity>
    
                </View>
                <View style= {[styles.coolLine]}/>
            </View>
            
        )
    } else {
        return (
            <React.Fragment/>
        )
    }

}