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
import Login from './components/login/Login.js';

const App = () => {
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
        animation: "slide_from_right",
        presentation: 'modal',
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
      <View style={styles.container}>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            initialRoute="Koti"
            screenOptions={{
              header: (props) => <TopBar {...props} />,
              headerStyle: styles.header,
            }}
          >
            {routes}
            {/* 
            <Stack.Screen
              name={'Koti'}
              component={Login}
              options={{ headerShown: false }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      
    );
  }
}

export default App;