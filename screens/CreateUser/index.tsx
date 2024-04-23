import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createUser } from '../../services/firebaseService/firebaseService';

const CreateUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = () => {
    createUser(email, password, firstName, lastName);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        autoCapitalize='none'
        onChangeText={(text) => setPassword(text)}
      />
      {/* <Button title="Create" color='#6358EC' onPress={handleCreate} /> */}
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
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
    textAlign: 'center',
  },
});

export default CreateUser;