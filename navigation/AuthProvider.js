import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            Alert.alert('Invalid User!', 'Username or password is incorrect', [
              {text: 'Okay'},
            ]);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            if (email == 0 && password == 0) {
              Alert.alert(
                'Wrong Input!',
                'Username or password fields cannot be empty',
                [{text: 'Okay'}],
              );
            } else {
              Alert.alert(
                'Email already in use!',
                'The email address is already in use by another account',
                [{text: 'Okay'}],
              );
            }
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        sendForgotEmail: async email => {
          try {
            await auth().sendPasswordResetEmail(email);
            Alert.alert(
              'Check your email!',
              'We send your password reset link to your registered email.',
            );
          } catch (e) {
            console.log(e);
            Alert.alert('Invalid User!', 'Username is incorrect', [
              {text: 'Okay'},
            ]);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
