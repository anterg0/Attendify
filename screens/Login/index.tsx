import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Text, View, Image } from 'react-native';
import 'firebase/auth';
import userRepository from '../../repositories/userRepository';

const repo = new userRepository();

const Login = ({ navigation }) => {
  const [email, onChangeText] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);


  const handleLogin = () => {
    setIsLoading(true);
    repo.signInWithFirebase(email, password)
      .then((userCred) => {
        if (userCred.type == 'admin') {
          console.log('Admin signed in successfully!');
          navigation.replace('AdminHome');
          return;
        }
        console.log('User signed in successfully!');
        navigation.replace('UserHome');
      })
      .finally(() => setIsLoading(false));
  };

  const loginInputStyle = isLoading ? { opacity: 0.5 } : {};

  return (
    <SafeAreaView style={styles.cont}>
      <Text style={styles.title}>👮🏻‍♂️Attendify</Text>
      <Text style={styles.subtitle}>Employee attendance tracking system</Text>
      <TextInput
        style={[styles.input, loginInputStyle, isEmailFocused && styles.inputFocused]}
        onChangeText={onChangeText}
        value={email}
        onFocus={() => setIsEmailFocused(true)}
        onBlur={() => setIsEmailFocused(false)}
        placeholder="Email"
        autoCapitalize='none'
        editable={!isLoading}
      />
      <TextInput
        style={[styles.input, loginInputStyle, isPasswordFocused && styles.inputFocused]}
        onChangeText={onChangePassword}
        value={password}
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
        placeholder="Password"
        autoCapitalize='none'
        secureTextEntry={true}
        editable={!isLoading}
      />
      <TouchableOpacity style={[styles.button, loginInputStyle]} onPress={handleLogin}>
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
  title : {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle : {
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  input: {
    height: 40,
    margin: 7,
    borderWidth: 1,
    borderRadius: 7,
    padding: 10,
    minWidth: "60%",
  },
  inputFocused: {
    borderColor: '#6358EC',
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
    borderRadius: 7,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;