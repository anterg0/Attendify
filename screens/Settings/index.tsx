import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import userRepository from "../../repositories/userRepository";
import { Firestore, serverTimestamp } from "firebase/firestore";

const auth = getAuth();
const userRepo = new userRepository();

const Settings = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false
    });
  }, [navigation]);

  const handleLogOut = async () => {
    try {
        setIsLoading(true);
        await auth.signOut();
        setIsLoading(false);
        navigation.navigate('Login');
    } catch (error) {
        console.error(error);
        Alert.alert('Error', "Couldn't log out.");
    }
  };

  const handleUpdateUser = async () => {
    try {
        setIsLoading(true);
        // await userRepo.updatePass('testtesttest','testtest');
        setIsLoading(false);
        Alert.alert('Success', 'Password successfully changed');
    } catch (error) {
        console.error(error);
        Alert.alert('Error', "Couldn't change pass");
        setIsLoading(false);
    }
  };

  const handlePurge = async () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'NO',
          style: 'cancel',
        },
        {
          text: 'YES',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              await userRepo.deleteUser();
              console.info(auth.currentUser);
              setIsLoading(false);
              navigation.navigate('Login');
            } catch (error) {
              throw error;
            }
          },
        },
      ]
    );
    
  };
  const handleRequests = async () => {
    
  };

  return (
    <View style={styles.cont}>
        <TouchableOpacity style={styles.button} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePurge}>
            <Text style={styles.buttonText}>Purge Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRequests}>
            <Text style={styles.buttonText}>Get Requests</Text>
        </TouchableOpacity>
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
    input: {
      height: 40,
      margin: 7,
      borderWidth: 1,
      borderRadius: 7,
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
      borderRadius: 7,
      margin: 10,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
});
  

export default Settings;
