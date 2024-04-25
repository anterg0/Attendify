import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Attend from '../Attend';
import AttendanceScreen from '../AttendanceScreen';
import Settings from '../Settings';

const Tab = createBottomTabNavigator();

const UserHome = ({ navigation }) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false
    });
  }, [navigation]);

  return (
    <Tab.Navigator initialRouteName='Attend' screenOptions={{
        tabBarActiveTintColor: "#6358EC"
      }}>
      <Tab.Screen name='History'
      component={AttendanceScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='time-sharp' color={color} size={size} />
        ),
      }}/>
      <Tab.Screen 
      name='Home  ' 
      component={Attend} 
      options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home-sharp' color={color} size={size} />
          ),
        }}/>
      <Tab.Screen
      name='Settings'
      component={Settings}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='settings-sharp' color={color} size={size}/>
        )
      }}
      />
    </Tab.Navigator>
  );
};

export default UserHome;
