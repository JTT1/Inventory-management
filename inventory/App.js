import React from 'react'
import { styles } from './styles/AppRootStyle.js';
import { View, } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import SearchComponents from './components/search/SearchComponents';
import ConfirmScreen from './components/confirm/ConfirmScreen';
import LoanListItem from './components/returnloan/LoanListItem.js';
import UserLoans from './components/returnloan/UserLoans.js';
import TopBar from './components/topbar/TopBar';
import Register from "./components/login/Register";
import Componentlist from"./components/testing_field/Componentlist";
import Login from './components/login/Login';


const App = () => {
  const [fontsLoaded] = useFonts({
    Quicksand400: require('./assets/fonts/Quicksand400Regular.ttf'),
    Quicksand500: require('./assets/fonts/Quicksand500Medium.ttf'),
    Quicksand600: require('./assets/fonts/Quicksand600SemiBold.ttf'),
    Quicksand700: require('./assets/fonts/Quicksand700Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        {/* <TopBar /> */}
        {/* <UserLoans /> */}
        {/* <Componentlist/> */}
         {/* <Register/>  */}
        {/* <Register /> */}
        {/* <TopBar /> */}
        {/* <ConfirmScreen returnLoan={true} /> */}
        {/* <SearchComponents /> */}
        <StatusBar style="light" />
      </View>
    );
  }
}

export default App;