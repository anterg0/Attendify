import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import userRepository from "../../repositories/userRepository";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

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
      await auth.signOut();
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
    <SafeAreaView>
      <View style={styles.profileContainer}>
        <View style={styles.logoContainer}>
          <Ionicons name="person-circle-sharp" size={100} color={'gray'}/>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{auth.currentUser.displayName || `You don't have a display name`}</Text>
          <Text style={styles.userEmail}>{auth.currentUser.email}</Text>
        </View>
      </View>
      <View style={styles.cont}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChangeInfo')}>
            <Text style={styles.buttonText}>Change Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePurge}>
            <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
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
    cont: {
      alignItems: 'center',
      justifyContent: 'space-between',
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
      width: '80%',
      backgroundColor: '#6358EC',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 7,
      marginBottom: 5,
      minHeight: 40,
      marginVertical: 20,
    },
    buttonText: {
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      textTransform: 'uppercase'
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 20,
    },
    logoContainer: {
        marginRight: 15,
    },
    userInfoContainer: {
        flexDirection: 'column'
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
    },
    logo: {
      position: 'absolute',
      top: 20, // Adjust top position as needed
      left: 20, // Adjust left position as needed
      width: 80, // Adjust width as needed
      height: 80, // Adjust height as needed
  },
});
  

export default Settings;
