import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

import {AuthContext} from '../navigation/AuthProvider';
import {AuthProvider} from '../navigation/AuthProvider';
import MainTabScreen from './MainTabScreen';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? (
        <MainTabScreen />
      ) : (
        <RootStack.Navigator>
          <RootStack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}></RootStack.Screen>
          <RootStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}></RootStack.Screen>
          <RootStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{headerShown: false}}></RootStack.Screen>
          <RootStack.Screen
            name="Home"
            component={HomeScreen}></RootStack.Screen>
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootStackScreen;
