import { View, Text} from 'react-native'
import React, {useContext} from 'react'
import { profileStyles as styles } from './profileStyles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from '../context/userContext';



const MyInfo = () => {

const { user } = useContext(UserContext);


    return (
        <View style={[styles.mainInfoBox]}>

            <View style={[styles.infoBox, styles.flexRow]}>
            <MaterialCommunityIcons style={styles.icons} name="account-details" size={30} color="#FFFFFF" />
            <Text style={[styles.h4]}>{user.etunimi} {user.sukunimi}</Text>
            </View>

            <View style={[styles.infoBox, styles.flexRow]}>
            <MaterialCommunityIcons style={styles.icons} name="email-edit" size={30} color="#FFFFFF" />
            <Text style={[styles.bodyTextWhite]}>{user.email}</Text>
            </View>

            <View style={[styles.infoBox, styles.flexRow]}> 
            <MaterialCommunityIcons style={styles.icons} name="account-key" size={30} color="#FFFFFF" />
            <Text style={[styles.bodyTextWhite]}>{user.rooli}</Text>
            </View>

        </View>
    )
};

export default MyInfo;