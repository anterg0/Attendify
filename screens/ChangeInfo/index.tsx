import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import userRepository from '../../repositories/userRepository';

const repo = new userRepository();

const ChangeInfo = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isNameChanged, setIsNameChanged] = useState(false);

    const getInfo = async () => {
        const user = await repo.getMe();
        setFirstName(user.firstName);
        setLastName(user.lastName);
    };

    useEffect(() => {
        getInfo();
    }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => {
            setFirstName(text);
            setIsNameChanged(true);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => {
            setLastName(text);
            setIsNameChanged(true);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        value={oldPass}
        autoCapitalize='none'
        onChangeText={(text) => setOldPass(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry={true}
        value={newPass}
        autoCapitalize='none'
        onChangeText={(text) => setNewPass(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPass}
        autoCapitalize='none'
        onChangeText={(text) => setConfirmPass(text)}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    minWidth: '80%',  
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
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
    textAlign: 'center',
  },
});

export default ChangeInfo;