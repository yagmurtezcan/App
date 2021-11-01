/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';

import {AuthContext} from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MainTabScreen from './screens/MainTabScreen';

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    // bu kısımda baslangıc statelerimizi kaydetttik.
    isLoading: true,
    userName: null,
    userToken: null,
  };

  // bu fonksiyonla uygulama ilk acıldığında kullanıcının ilk başta önceden login olup olmadığını kontrol edecek.
  const loginReducer = (previousState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...previousState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...previousState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': // kullancı logout olduğunda değerleri setlememiz gerek.
        return {
          ...previousState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...previousState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        // setUserToken('fghj');
        // setIsLoading(false);
        // asynstorage yükledikten sonra yukarıdan import ettik https://react-native-async-storage.github.io/async-storage/docs/usage deki kullanıma göre buraya entegre edeceğiz.
        // const storeData = async (value) => {
        //   try {
        //     await AsyncStorage.setItem('@storage_Key', value)
        //   } catch (e) {
        //     // saving error
        //   }
        // }
        const userToken = String(foundUser[0].userToken); // .userToken dediğimiz users klasöründen aldığımız eşleşen kullanıcının tokenı.
        const userName = foundUser[0].username;
        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e); // error mesajını consoledan yakalayacağız.
        }

        // console.log('user  token', userToken);
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        // burda da signout olduğunda usertokenı kaldırmamız lazım asycnstoragedan
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e); // error mesajını consoledan yakalayacağız.
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('fghj');
        // setIsLoading(false);
      },
    }),
    [],
  ); // buranın yeniden render olması için [] koyduk

  // screen render olduğunda loading stateten sonra useeffect calısacak
  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false); // isloadingi falsea set et dedik. 1000 miliseconddan sonra
      let userToken; // burda usertokenı update ettik yeni değer verdik.
      userToken = null; // uygulama ilk açıldığında usertoken null olacak ve asyncstoagedan biz tokenı alacağız try catch ile
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e); // error mesajını consoledan yakalayacağız.
      }
      // console.log('user token', userToken);
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userToken != null ? (
        //<HomeScreen></HomeScreen>
        <MainTabScreen></MainTabScreen>
      ) : (
        <RootStackScreen></RootStackScreen>
      )}
    </AuthContext.Provider>
  );
};

export default App;
