import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import userRepository from "../../repositories/userRepository";

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
        navigation.replace('Login');
    } catch (error) {
        console.error(error);
        Alert.alert('Error', "Couldn't log out.");
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
              navigation.replace('Login');
            } catch (error) {
              throw error;
            }
          },
        },
      ]
    );
    
  };

  return (
    <View style={styles.cont}>
        <TouchableOpacity style={styles.button} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePurge}>
            <Text style={styles.buttonText}>Purge Account</Text>
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
      height: 40,
      width: '100%',
      borderWidth: 1,
      borderColor: '#6358EC',
      margin: -0.3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
    },
});
  

export default Settings;
