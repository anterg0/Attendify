import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import CreateUser from '../CreateUser';
import CheckUsers from '../CheckUsers';
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();
const AdminHome = ({ navigation }) => {
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
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: "#6358EC"
    }}>
      <Tab.Screen 
      name='Users' 
      component={CheckUsers} 
      options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name='Create User' 
      component={CreateUser}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-add-outline" color={color} size={size} />
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

export default AdminHome;
