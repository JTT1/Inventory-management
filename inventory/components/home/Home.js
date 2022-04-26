import React from "react";

import { homeStyles as styles } from './homeStyles';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AdminBar from "../adminBar/AdminBar";



export default function Home({ navigation }) {

  return (
    <View style={styles.backgroundColor}>

      <Text style={styles.h1}>Mitä haluat tehdä?</Text>

      <View style={styles.mainBox}>

        <TouchableOpacity onPress={() => navigation.navigate('Haku')}>
          <View style={styles.flexRow}>

            <View style={[styles.secondaryBox, styles.removeSpacer]}>
              <View style={styles.flexRow}>
                <MaterialCommunityIcons style={styles.homeIcon} name="magnify" size={30} color="#FFFFFF" />
                <Text style={styles.h2}>HAE JA LAINAA</Text>
              </View>
              <Text style={styles.bodyTextWhite}>Etsi työkaluja ja komponentteja nimellä tai kategorialla.</Text>

            </View>
            <View style={styles.imageBox}>
              <MaterialCommunityIcons style={[styles.imageBox]} name="chevron-right" size={80} color="#1DFFBB" />
            </View>

          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Palautus')}>
          <View style={styles.flexRow}>

            <View style={styles.secondaryBox}>
              <View style={styles.flexRow}>
                <MaterialCommunityIcons style={styles.homeIcon} name="keyboard-return" size={30} color="#FFFFFF" />
                <Text style={styles.h2}>PALAUTA</Text>
              </View>
              <Text style={styles.bodyTextWhite}>Palauta lainaamiasi komponentteja.</Text>

            </View>

            <View style={styles.imageBox}>
              <MaterialCommunityIcons style={[styles.imageBox]} name="chevron-right" size={80} color="#1DFFBB" />
            </View>

          </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate('Skannaus')}>
          <View style={styles.flexRow}>

            <View style={styles.secondaryBox}>
              <View style={styles.flexRow}>
                <MaterialCommunityIcons style={[styles.qrIcon, styles.homeIcon]} name="qrcode-scan" size={30} color="#FFFFFF" />
                <Text style={[styles.h2, styles.h2WidthFix]}>SKANNAA QR-KOODI</Text>
              </View>
              <Text style={styles.bodyTextWhite}>Skannaa QR-koodi laatikosta ja löydä etsimäsi komponentti nopeasti.</Text>

            </View>

            <View style={styles.imageBox}>
              <MaterialCommunityIcons style={styles.imageBox} name="chevron-right" size={80} color="#1DFFBB" />
            </View>

          </View>
        </TouchableOpacity>

      </View>

      <AdminBar navigation={navigation} />

    </View>

  )
};