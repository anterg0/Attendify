import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Attend from '../Attend';
import AttendanceScreen from '../AttendanceScreen';

const Tab = createBottomTabNavigator();

const UserHome = ({ navigation }) => {

  return (
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

export default UserHome;
