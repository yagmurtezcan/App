/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';

// import {AuthContext} from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MainTabScreen from './screens/MainTabScreen';

import LottieView from 'lottie-react-native';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {AuthProvider} from './navigation/AuthProvider';

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    // bu kısımda baslangıc statelerimizi kaydetttik.
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <AuthProvider>
      <RootStackScreen />
    </AuthProvider>
  );

  // (<PaperProvider theme={theme}>
  //   <AuthContext.Provider value={authContext}>
  //     {isDarkTheme ? (
  //       <StatusBar backgroundColor="#FF6347" barStyle="light-content" />
  //     ) : (
  //       <StatusBar backgroundColor="#FF6347" barStyle="dark-content" />
  //     )}
  //     {loginState.userToken != null ? (
  //       //<HomeScreen></HomeScreen>
  //       <NavigationContainer theme={theme}>
  //         <MainTabScreen></MainTabScreen>
  //       </NavigationContainer>
  //     ) : (
  //       <RootStackScreen></RootStackScreen>
  //     )}
  //   </AuthContext.Provider>
  // </PaperProvider>);
};

export default App;
