import React from 'react'
import { styles } from './styles/AppRootStyle.js';
import { View, } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import TopBar from './components/topbar/TopBar.js';
import ConfirmScreen from './components/confirm/ConfirmScreen.js';
import Login from './components/login/Login';
import Register from './components/login/Register';
import SearchComponents from './components/search/SearchComponents.js';
import ThemeButton from './components/testing_field/ThemeButton.js';


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
        <TopBar />
        {/* <Login /> */}
        {/* <Register /> */}

        <SearchComponents />
        <StatusBar style="light" />
      </View>
    );
  }
}

export default App;