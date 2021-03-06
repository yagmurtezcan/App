import React from 'react';
import {View} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import NotificationScreen from './NotificationScreen';
import PostScreen from './PostScreen';
import AddPostScreen from './AddPostScreen';

import {useTheme} from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileStack = createNativeStackNavigator();
const PostStack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="PostScreen"
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
        name="PostScreen"
        component={PostStackScreen}
        options={{
          tabBarLabel: 'Posts',
          tabBarColor: '#D34E8E',
          tabBarIcon: ({color}) => (
            <View>
              <MaterialCommunityIcons
                name={'post-outline'}
                color={color}
                size={26}
              />
            </View>
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
          tabBarColor: '#F7AB31',
          tabBarIcon: ({color}) => (
            <View>
              <Icon name={'notifications'} color={color} size={26} />
            </View>
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default MyTabs;

const ProfileStackScreen = ({navigation}) => {
  const {colors} = useTheme(); // dark theme e uygun header olmas?? i??in bu kodu ekleyip a??a????daki kodlar?? return etmemiz gerkeiyor.

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // ios
          elevation: 0, // android ... edit butonunu alt??ndaki cizgiyi kald??rmak i??in shadowcolor fff kodu yaz??ld?? ancak etki etmedi ara??t??r.
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

const PostStackScreen = ({navigation}) => {
  const {colors} = useTheme(); // dark theme e uygun header olmas?? i??in bu kodu ekleyip a??a????daki kodlar?? return etmemiz gerkeiyor.

  return (
    <PostStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // ios
          elevation: 0, // android ... edit butonunu alt??ndaki cizgiyi kald??rmak i??in shadowcolor fff kodu yaz??ld?? ancak etki etmedi ara??t??r.
        },
        headerTintColor: colors.text,
      }}>
      <PostStack.Screen
        name="Post"
        component={PostScreen}
        options={{
          title: '',
          headerRight: () => (
            <FontAwesome.Button
              name="plus"
              size={25}
              backgroundColor={colors.background}
              color={colors.text}
              onPress={() => navigation.navigate('AddPost')}
            />
          ),
        }}
      />
      <PostStack.Screen
        name="AddPost"
        options={{
          title: 'Add Post',
        }}
        component={AddPostScreen}
      />
    </PostStack.Navigator>
  );
};
