import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Attend from '../Attend';
import AttendanceScreen from '../AttendanceScreen';
const Tab = createBottomTabNavigator();
const UserHome = ({ navigation }) => {
  const handleCreateUserAccount = () => {
    navigation.navigate('CreateUser');
  };

  const handleCheckUsers = () => {
    navigation.navigate('CheckUsers');
  };

  return (
    // <View style={styles.container}>
    //   <Button
    //     title="Create User Account"
    //     onPress={handleCreateUserAccount}
    //     color='#6358EC' // Цвет текста кнопки: белый
    //   />
    //   <Button
    //     title="Check Users"
    //     onPress={handleCheckUsers}
    //     color="#6358EC" // Цвет текста кнопки: белый
    //   />
    // </View>
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: "#6358EC"
      }}>
      <Tab.Screen 
      name='Attend' 
      component={Attend} 
      options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name='History' 
      component={AttendanceScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="list-circle-outline" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      marginVertical: 10,
      minWidth: 200,
      borderWidth: 0.5,
      borderRadius: 5, 
      borderColor: '#5988ec',
    },
  });

export default UserHome;
