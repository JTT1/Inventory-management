import { View, Text, ScrollView, Image, ImageBackground, TouchableOpacity, BackHandler} from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { profileStyles as styles } from './profileStyles'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from '../context/userContext';
import { logout } from '../../helpers/firebaseFunctions';
import MyInfo from './MyInfo';
import MyLoans from './MyLoans';





const Profile = (props) => {

const { user } = useContext(UserContext);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', close);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', close);
        }
    }, []);

    const close = () => {
        props.navigation.navigate("Koti");
        return true;
    }

    const handleLogOut = async () => {
        return await logout()
            .then(() => {
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Loading' }]
                });
            })
    }


    return (
        <View>
            <View style={[styles.centerVertical, styles.mainContainer]}>
                <ImageBackground source={{ uri: "https://picsum.photos/200" }} style={[styles.profileBackgroundImage]} blurRadius={5}>

                <View style={[styles.centerVertical, styles.profileBox]}>
                    <View style={[styles.flexRow, styles.alignLeft]}>   

                        <TouchableOpacity onPress={close}>
                        <MaterialCommunityIcons style={[styles.iconShadow]} name="arrow-left" size={45} color="#1DFFBB" />
                        </TouchableOpacity>

                        <View style={[styles.alignMiddle]}>
                            <Text style={[styles.h1]}>Profiili</Text>
                        </View>

                    </View>
                    
                    <Image source={{ uri: "https://picsum.photos/200" }} style={[styles.userImg, styles.imgContainer]} />
                    <Text style={[styles.h4, styles.marginFix]}>{user.etunimi} {user.sukunimi}</Text>
                    
                    <TouchableOpacity onPress={handleLogOut}>
                        <Text style={[styles.bodyTextYellow, {marginBottom: 15}]}>Kirjaudu Ulos</Text>
                    </TouchableOpacity>
                    
                    

                </View>
                </ImageBackground>
                <ScrollView style={{width:"100%"}}>
                    <Text style={[styles.h2, {alignSelf:"center", marginTop: 10}]}>Omat tiedot</Text>
                 <MyInfo/>
                 <MyLoans/>
                </ScrollView>
            </View>
        </View>
    )
};

export default Profile;