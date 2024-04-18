import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import AttendanceScreen from './screens/AttendanceScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminHome from './screens/AdminHome';
import CreateUser from './screens/CreateUser';

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="AttendanceScreen" component={AttendanceScreen}/>
      <Stack.Screen name="AdminHome" component={AdminHome}/>
      <Stack.Screen name="CreateUser" component={CreateUser}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
