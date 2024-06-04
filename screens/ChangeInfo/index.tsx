import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import userRepository from '../../repositories/userRepository';

const repo = new userRepository();

const ChangeInfo = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isNameChanged, setIsNameChanged] = useState(false);
    const [isPassCorrect, setIsPassCorrect] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const getInfo = async () => {
        const user = await repo.getMe();
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setOldPass('');
        setNewPass('');
        setConfirmPass('');
    };

    useEffect(() => {
        setIsLoading(true);
        getInfo();
        setIsLoading(false);
    }, []);

    const checkPass = (text) => {
        setConfirmPass(text);
        if (newPass === text) setIsPassCorrect(true);
        else setIsPassCorrect(false);
    };

    const handleChanges = async () => {
        if (isNameChanged) {
            setIsLoading(true);
            await repo.updateUser(firstName, lastName);
        }
        if (oldPass && newPass && confirmPass) {
            setIsLoading(true);
            if (isPassCorrect) {
                try {
                    await repo.updatePass(oldPass, newPass);
                } catch (e) {
                    Alert.alert('Error', e);
                }
            }
            else Alert.alert('Error', 'Your passwords do not match.');
        } else if (!oldPass && !newPass && !confirmPass) {
            
        } else {
            Alert.alert('Error', 'Please check your password inputs.');
        }
        setIsLoading(false);
        Alert.alert('Success', 'Changes are saved.');
        navigation.goBack();
    };

    const loading = isLoading ? {opacity: 0.5} : {};

  return (
    <View style={styles.container}>
        <View style={[loading]}>
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
            secureTextEntry={true}
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
            style={[styles.input, !isPassCorrect && styles.wrongPass]}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPass}
            autoCapitalize='none'
            onChangeText={(text) => {
                checkPass(text);
            }}
        />
        {!isPassCorrect && <Text style={styles.wrongText}>Your passwords do not match.</Text>}
        <TouchableOpacity style={styles.button} onPress={handleChanges}>
            <Text style={styles.buttonText}>Confirm Changes</Text>
        </TouchableOpacity>
    </View>
      {isLoading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#6358EC"
        />
      )}
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
  wrongPass: {
    borderColor: 'red',
  },
  wrongText: {
    color: 'red',
    fontSize: 15,
    marginBottom: 10,
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