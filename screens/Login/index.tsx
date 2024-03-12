import React from 'react';

import {Button, SafeAreaView, StyleSheet, TextInput} from 'react-native';

const Login = ({navigation}) => {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="username"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="password"
        secureTextEntry={true}
      />
      <Button title="Log In"
      onPress={() =>
        navigation.navigate('Home')
      }></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: "60%",
  },
});

export default Login;