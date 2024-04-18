import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import 'firebase/auth';
import { signIn } from '../../firebaseConfig';

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
        navigation.navigate('UserHome');
      })
      .catch((error) => {
        console.error('Error signing in user:', error.code);
        let errorMessage = '';
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'User not found. Please check your email or sign up.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email format. Please enter a valid email address.';
            break;
          case 'auth/email-already-in-use':
            errorMessage = 'Email is already in use. Please use a different email or sign in.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many unsuccessful login attempts. Please try again later.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your internet connection.';
            break;
          case 'auth/invalid-credential':
            errorMessage = 'Invalid credentials.'
            break;
          default:
            errorMessage = 'An error occurred. Please try again later.';
        }

        Alert.alert('Authentication Error', errorMessage);
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
      {/* <Button
        color='#6358EC'
        title={isLoading ? "Logging In..." : "Log In"}
        onPress={handleLogin}
      /> */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{isLoading ? "Logging In..." : "Log In"}</Text>
      </TouchableOpacity>
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
    margin: 7,
    borderWidth: 1,
    borderRadius: 50,
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
  button: {
    backgroundColor: '#6358EC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;