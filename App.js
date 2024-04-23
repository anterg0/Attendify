import { StyleSheet } from 'react-native';
import Login from './screens/Login';
import AttendanceScreen from './screens/AttendanceScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminHome from './screens/AdminHome';
import CreateUser from './screens/CreateUser';
import UserHome from './screens/UserHome';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login Screen' }} // Set the title for the Login screen
        />
        <Stack.Screen
          name="AttendanceScreen"
          component={AttendanceScreen}
          options={{ title: 'Attendance Screen' }} // Set the title for the AttendanceScreen
        />
        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
          options={{ title: 'Admin Panel' }} // Set the title for the AdminHome screen
        />
        <Stack.Screen
          name="CreateUser"
          component={CreateUser}
          options={{ title: 'Create User' }} // Set the title for the CreateUser screen
        />
        <Stack.Screen
          name="UserHome"
          component={UserHome}
          options={{ title: 'User Panel' }} // Set the title for the CreateUser screen
        />
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
