import React, {useState, useContext} from 'react';
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

const ForgotPassword = ({navigation}) => {
  const [data, setData] = useState({
    password: '',
    confirm_password: '',
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    check_passwordMatch: true,
  });

  const {login} = useContext(AuthContext);

  const onVerifyNewPassword = () => {
    if (data.password == data.confirm_password) {
      setData({
        ...data,
        check_passwordMatch: true,
        isValidPassword: true,
      });
      return console.log('OK.');
    } else if (
      data.password !== data.confirm_password ||
      data.confirm_password == null ||
      data.password == null
    ) {
      setData({
        ...data,
        check_passwordMatch: false,
      });
      return console.log('Passwords dont match');
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleConfirmPasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry, // eğer true ise false yap false ise true yap demek bu yani neyse tam tersini yap demek
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry, // eğer true ise false yap false ise true yap demek bu yani neyse tam tersini yap demek
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Password Reset!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={[styles.text_footer, {marginTop: 20}]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false} // data.securetextenrt ? true : aksi takdirde false olacak.
            style={styles.textInput}
            autoCapitalize="none"
            onEndEditing={val => onVerifyNewPassword(val.nativeEvent.text)}
            onChangeText={e => handlePasswordChange(e)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long
            </Text>
          </Animatable.View>
        )}

        <Text style={[styles.text_footer, {marginTop: 20}]}>
          Confirm Password
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Confirm Your Password"
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onEndEditing={val => onVerifyNewPassword(val.nativeEvent.text)}
            onChangeText={e => handleConfirmPasswordChange(e)}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.confirm_secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        {data.isValidConfirmPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long
            </Text>
          </Animatable.View>
        )}

        {data.check_passwordMatch ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Passwords do not match!</Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              if (data.check_passwordMatch == false) {
                {
                  data.check_passwordMatch ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>
                        Passwords do not match!
                      </Text>
                    </Animatable.View>
                  );
                }
              } else if (data.isValidUser == false) {
                {
                  data.isValidUser ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>
                        Please enter a valid email address
                      </Text>
                    </Animatable.View>
                  );
                }
              } else {
                register(data.email, data.password);
              }
            }}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={[styles.signIn, {marginTop: 10}]}>
              <Text style={styles.textSign}>Password Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.signIn,
              {
                marginTop: 10,
                borderColor: '#009387',
                borderWidth: 1,
              },
            ]}>
            <Text style={[styles.textSign, {color: '#009387'}]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default ForgotPassword;

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
});
