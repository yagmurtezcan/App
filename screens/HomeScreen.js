import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {AuthContext} from '../components/context';

const HomeScreen = () => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}></Button>
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
