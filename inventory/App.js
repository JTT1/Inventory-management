import React from 'react'
import { styles } from './styles/AppRootStyle.js';
import { View, } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopBar from './components/topbar/TopBar';
import { routesList } from './app-routes/routes.js';
import uuid from 'react-uuid';
import { UserContext } from './components/context/userContext';

const App = () => {

  // When login works replace this with the user object (needed for UserContext)
  const user = {
    '1234': {
      email: "essi@esimerkki.fi",
      etunimi: "Essi",
      sukunimi: "Esimerkki",
      rooli: "user",
    }
  };

  // Navigation stack
  const Stack = createNativeStackNavigator();

  // Dynamic routes list, new routes can be added from /app-routes/routes.js (ctrl + click on routesList)
  const routes = routesList.map((screen) => {
    return <Stack.Screen
      key={uuid()}
      name={screen.name}
      component={screen.component}
      options={{
        headerShown: screen?.header,
        animationTypeForReplace: 'push',
        animation: 'fade_from_bottom',
        presentation: 'card',
      }}
    />
  });

  // Load fonts
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
      <UserContext.Provider value={user}>
        <View style={styles.container}>
          <StatusBar style="light" />
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Koti"
              screenOptions={{
                header: (props) => <TopBar {...props} />,
                headerStyle: styles.header,
              }}
            >
              {routes}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </UserContext.Provider>
    );
  }
}

export default App;