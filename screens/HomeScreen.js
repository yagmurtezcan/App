import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {AuthContext} from '../components/context';

import {useTheme, Switch, TouchableRipple} from 'react-native-paper';

const HomeScreen = () => {
  const paperTheme = useTheme();

  const {signOut, toggleTheme} = React.useContext(AuthContext);

  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}></Button>
      <TouchableRipple
        onPress={() => {
          toggleTheme();
        }}>
        <View>
          <Switch
            // trackColor={{false: '#767577', true: '#81b0ff'}}
            // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={paperTheme.dark}
          />
        </View>
      </TouchableRipple>
      <View></View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
