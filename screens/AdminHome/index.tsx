import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CreateUser from '../CreateUser';
import CheckUsers from '../CheckUsers';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AdminHome = ({ navigation }) => {

  return (
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

export default AdminHome;
