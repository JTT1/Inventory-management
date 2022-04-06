import React, { useState } from 'react'
import { styles } from './styles/AppRootStyle.js';
import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import SearchComponents from './components/search/SearchComponents';
import { StatusBar } from 'expo-status-bar';
import TopBar from './components/topbar/TopBar.js';
// import Componentlist from './components/Componentlist';
// import { db, ROOT_REF } from './firebase/Config';
// import { Components } from './components/Items';
//Testi

const App = () => {
  // This has to be in app root as far as I know
  const [fontsLoaded] = useFonts({
    Quicksand400: require('./assets/fonts/Quicksand400Regular.ttf'),
    Quicksand500: require('./assets/fonts/Quicksand500Medium.ttf'),
    Quicksand600: require('./assets/fonts/Quicksand600SemiBold.ttf'),
    Quicksand700: require('./assets/fonts/Quicksand700Bold.ttf'),
  });
  // const [items, setItems] = useState({});

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <TopBar />
        <SearchComponents />
        <StatusBar style="light" />
      </View>
    );
  }
}

export default App;