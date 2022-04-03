import React, { useState } from 'react'
import { styles } from './styles/AppRootStyle.js';
import { View, Text } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import FontTest from './components/FontTest.js';
// import Componentlist from './components/Componentlist';
// import { db, ROOT_REF } from './firebase/Config';
// import { Components } from './components/Items';

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
        <FontTest />
      </View>
    );
  }
}

export default App;