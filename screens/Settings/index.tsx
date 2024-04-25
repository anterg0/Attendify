import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const auth = getAuth();

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

  return (
    <View style={styles.cont}>
        <TouchableOpacity style={styles.button} onPress={handleLogOut}>
            <Text style={styles.buttonText}>Log Out</Text>
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
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
});
  

export default Settings;
