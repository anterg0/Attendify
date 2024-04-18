import { getApp, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

const CreateUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = () => {
    // Handle the creation of a new user here
    // console.log('First Name:', firstName);
    // console.log('Last Name:', lastName);
    // console.log('Email:', email);
    // console.log('Password:', password);
    const db = getFirestore();
    const firebaseConfig = {
      apiKey: "AIzaSyDfyM_pSJ79bBQywoEzB5Le6eZUWrFplvc",
      authDomain: "attendify-e4203.firebaseapp.com",
      projectId: "attendify-e4203",
      storageBucket: "attendify-e4203.appspot.com",
      messagingSenderId: "675361693235",
      appId: "1:675361693235:web:5d2afdfb34b31496664d46",
      measurementId: "G-N3MJYQHKM2"
    };
    const app = initializeApp(firebaseConfig, "Secondary");
    createUserWithEmailAndPassword(getAuth(app), email, password).then((userCredentials) => {
      const usersCollection = collection(db, 'users');
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        type: 'user',
      };
      const addToDB = async () => {
        const newDoc = doc(usersCollection, userCredentials.user.uid);
        await setDoc(newDoc, newUser);
        console.log('User added to db! DOC ID: ', newDoc.id);
      }
      addToDB();
      console.log('User successfully created! ', userCredentials.user.uid);
      // sendEmailVerification(userCredentials.user);
      // console.log('User signed in right now: ', getAuth().currentUser.email);
    }).catch((error) => {
      console.log('ERROR: ', error);
    })
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