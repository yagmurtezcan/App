import React from 'react';
import {View} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        barStyle={{backgroundColor: '#F7AB31'}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#009387',
            tabBarIcon: ({color}) => (
              <FontAwesome name={'home'} color={color} size={26} />
            ),
          }}></Tab.Screen>
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#1f65ff',
            tabBarIcon: ({color}) => (
              <View>
                <FontAwesome name={'user'} color={color} size={26} />
              </View>
            ),
          }}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MyTabs;
