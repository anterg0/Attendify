import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CreateUser from '../CreateUser';
import CheckUsers from '../CheckUsers';
import { Ionicons } from '@expo/vector-icons';
import Settings from '../Settings';
import RequestScreen from '../RequestScreen';

const Tab = createBottomTabNavigator();

const AdminHome = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false
    });
  }, [navigation]);

  return (
    <Tab.Navigator initialRouteName='Users' screenOptions={{
      tabBarActiveTintColor: "#6358EC"
    }}>
      <Tab.Screen name='Requests' 
      component={RequestScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="paper-plane-sharp" color={color} size={size} />
        ),
      }}/>
      <Tab.Screen 
      name='Users' 
      component={CheckUsers} 
      options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-sharp" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name='Settings' 
      component={Settings}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='settings-sharp' color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
};

export default AdminHome;
