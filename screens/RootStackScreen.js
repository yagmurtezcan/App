import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import MainTabScreen from './MainTabScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => {
  return (
    <NavigationContainer>
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
        <RootStack.Screen name="Home" component={HomeScreen}></RootStack.Screen>
        {/* <RootStack.Screen
          name="MainTabScreen"
          component={MainTabScreen}
          options={{headerShown: false}}></RootStack.Screen> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
