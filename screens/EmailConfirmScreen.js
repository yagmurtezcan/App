import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {AuthContext} from '../navigation/AuthProvider';

const EmailConfirmScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    check_textInputChange: false,
    isValidUser: true,
  });

  const {sendForgotEmail} = useContext(AuthContext);

  const emailValidator = val => {
    const re = /\S+@\S+\.\S+/;
    if (re.test(val) == true) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true, // check işareti için satırı ekledik artık valid bir email girilmediyse check işareti olmayacak
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handleValidUser = val => {
    const re = /\S+@\S+\.\S+/;
    if (re.test(val) == true) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userName, password) => {
    // const foundUser = Users.filter(item => {
    //   return userName == item.email && password == item.password; // item.username dediğimiz users.js içerisindeki username
    // });

    // if (data.email.length == 0) {
    //   Alert.alert('Invalid User!', 'Username or password is incorrect', [
    //     {text: 'Okay'},
    //   ]);
    //   return;
    // }
    login();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Forgot Password?</Text>
        <Text style={styles.text_subHeader}>
          You can give us your registered email and we will send a reset link
        </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={[styles.text_footer, {marginTop: 20}]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => emailValidator(val)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />

          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View> //datanın check input changei eger true ise >> aşağıdaki ikonu kulaanırsın  :null kısmı ise akti takdirde null a render etmiş oluruz.
          ) : null}
        </View>

        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Please enter a valid email address
            </Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              if (data.email.length == 0) {
                Alert.alert('Wrong Input!', 'Username field cannot be empty', [
                  {text: 'Okay'},
                ]);
                return;
              } else {
                sendForgotEmail(data.email);
                // forgot password ekranına yönlendirmek istediğinde aşağıdaki kodu acarsın.
                // navigation.navigate('ForgotPassword');
                navigation.navigate('SignIn');
              }
            }}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={[styles.signIn, {marginTop: 10}]}>
              <Text style={styles.textSign}>Send</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* sistem suanda firebase link gönderdiğinde EmailConfirmScreenden SignIn screene yonlendirmeli calısıyor.
          
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={[
              styles.signIn,
              {
                marginTop: 10,
                borderColor: '#009387',
                borderWidth: 1,
              },
            ]}>
            <Text style={[styles.textSign, {color: '#009387'}]}>Sign In</Text>
          </TouchableOpacity> */}
        </View>
      </Animatable.View>
    </View>
  );
};

export default EmailConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text_subHeader: {
    color: '#fff',
    fontSize: 15,
    marginTop: 10,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    margintop: 20,
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 350,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontWeight: 'bold',
  },
  errorMsg: {
    color: 'red',
    fontWeight: 'bold',
  },
  forgotText: {
    marginTop: 20,
    paddingLeft: 200,
    color: 'green',
    fontWeight: 'bold',
  },
});
