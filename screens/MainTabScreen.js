import React from 'react';
import {View} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import NotificationScreen from './NotificationScreen';

import {NavigationContainer, useTheme} from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileStack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
          name="ProfileScreen"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#1f65ff',
            tabBarIcon: ({color}) => (
              <View>
                <FontAwesome name={'user'} color={color} size={26} />
              </View>
            ),
          }}></Tab.Screen>
        <Tab.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            tabBarLabel: 'Notifications',
            tabBarColor: '#1f65ff',
            tabBarIcon: ({color}) => (
              <View>
                <Icon name={'notifications'} color={color} size={26} />
              </View>
            ),
          }}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MyTabs;

const ProfileStackScreen = ({navigation}) => {
  const {colors} = useTheme(); // dark theme e uygun header olması için bu kodu ekleyip aşağıdaki kodları return etmemiz gerkeiyor.

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // ios
          elevation: 0, // android ... edit butonunu altındaki cizgiyi kaldırmak için shadowcolor fff kodu yazıldı ancak etki etmedi araştır.
        },
        headerTintColor: colors.text,
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          headerRight: () => (
            <MaterialCommunityIcons.Button
              name="account-edit"
              size={25}
              backgroundColor={colors.background}
              color={colors.text}
              onPress={() => navigation.navigate('EditProfile')}
            />
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};
