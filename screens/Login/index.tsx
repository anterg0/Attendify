import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import { createUser, signIn } from '../../firebaseConfig';

const Login = ({ navigation }) => {
  const [email, onChangeText] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    signIn(email, password)
      .then((userCred) => {
        if (userCred.type == 'admin') {
          console.log('Admin signed in successfully!');
          navigation.navigate('AdminHome');
          return;
        }
        console.log('User signed in successfully!');
        navigation.navigate('AttendanceScreen');
      })
      .catch((error) => {
        console.error('Error signing in user:', error);
        Alert.alert('Error', 'Error occured.');
      })
      .finally(() => setIsLoading(false));
  };

  const loginInputStyle = isLoading ? { opacity: 0.5 } : {};

  return (
    <SafeAreaView style={styles.cont}>
      <TextInput
        style={[styles.input, loginInputStyle]}
        onChangeText={onChangeText}
        value={email}
        placeholder="email"
        autoCapitalize='none'
        editable={!isLoading}
      />
      <TextInput
        style={[styles.input, loginInputStyle]}
        onChangeText={onChangePassword}
        value={password}
        placeholder="password"
        autoCapitalize='none'
        secureTextEntry={true}
        editable={!isLoading}
      />
      <Button
        color='#6358EC'
        title={isLoading ? "Logging In..." : "Log In"}
        onPress={handleLogin}
      />
      {isLoading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#6358EC"
        />
      )}
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
  cont: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;