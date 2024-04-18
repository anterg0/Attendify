import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Attend from '../Attend';
import AttendanceScreen from '../AttendanceScreen';
const Tab = createBottomTabNavigator();
const UserHome = ({ navigation }) => {
  const handleCreateUserAccount = () => {
    // Обработчик нажатия кнопки "Create User Account"
    navigation.navigate('CreateUser'); // Переход на экран создания пользователя
  };

  const handleCheckUsers = () => {
    // Обработчик нажатия кнопки "Check Users"
    navigation.navigate('CheckUsers'); // Переход на экран проверки пользователей
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
    <Tab.Navigator>
      <Tab.Screen 
      name='Attend' 
      component={Attend} 
      options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name='History' 
      component={AttendanceScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-add" color={color} size={size} />
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
      borderWidth: 0.5, // Граница кнопки
      borderRadius: 5, // Закругленные углы кнопки
      borderColor: '#5988ec', // Цвет границы кнопки
    },
  });

export default UserHome;