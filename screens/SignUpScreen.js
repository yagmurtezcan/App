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

const SignUpScreen = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    check_passwordMatch: true,
  });

  const {register} = useContext(AuthContext);

  const onVerifyNewPassword = () => {
    if (data.password == data.confirm_password) {
      setData({
        ...data,
        check_passwordMatch: true,
      });
      return console.log('OK.');
    } else if (
      data.password !== data.confirm_password ||
      data.confirm_password !== null
    ) {
      setData({
        ...data,
        check_passwordMatch: false,
      });
      return console.log('Passwords dont match');
    }
  };

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
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={[styles.text_footer, {marginTop: 20}]}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            // onChangeText={val => textInputChange(val)}
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

        <Text style={[styles.text_footer, {marginTop: 20}]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false} // data.securetextenrt ? true : aksi takdirde false olacak.
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
            // onChange={e => setData(e.target.value)}
            // onBlur={onVerifyNewPassword}
            onEndEditing={e => onVerifyNewPassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? ( // eğer data secure entry true ise eye off kullan değilse eye kullan dicez bu sayede tıklandığında ikon değişsecek  : dan sonra aksi takdirde eye kullan dedik
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        {data.isValidPassword ? null : ( // nullsa gösterme değilse bu mesajı göster
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
            secureTextEntry={data.confirm_secureTextEntry ? true : false} // data.securetextenrt ? true : aksi takdirde false olacak.
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => handleConfirmPasswordChange(val)}
            // onChange={e => setData(e.target.value)}
            // onBlur={onVerifyNewPassword}
            onEndEditing={e => onVerifyNewPassword(e.nativeEvent.text)}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.confirm_secureTextEntry ? ( // eğer data secure entry true ise eye off kullan değilse eye kullan dicez bu sayede tıklandığında ikon değişsecek  : dan sonra aksi takdirde eye kullan dedik
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        {data.isValidConfirmPassword ? null : ( // nullsa gösterme değilse bu mesajı göster
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long
            </Text>
          </Animatable.View>
        )}

        {data.check_passwordMatch ? null : ( // nullsa gösterme değilse bu mesajı göster
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Passwords do not match!</Text>
          </Animatable.View>
        )}

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              if (data.check_passwordMatch == false) {
                // Alert.alert(
                //   'Wrong Input!',
                //   'Password and password confirm field can be the same',
                //   [{text: 'Okay'}],
                // );
                // return;
                {
                  data.check_passwordMatch ? null : ( // nullsa gösterme değilse bu mesajı göster
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>
                        Passwords do not match!
                      </Text>
                    </Animatable.View>
                  );
                }
              } else if (data.isValidUser == false) {
                // Alert.alert(
                //   'Wrong Input!',
                //   'Please enter a valid email adress',
                //   [{text: 'Okay'}],
                // );
                // return;
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
              <Text style={styles.textSign}>Sign Up</Text>
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

export default SignUpScreen;

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
