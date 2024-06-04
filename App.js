import { StyleSheet } from 'react-native';
import Login from './screens/Login';
import AttendanceScreen from './screens/AttendanceScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminHome from './screens/AdminHome';
import CreateUser from './screens/CreateUser';
import UserHome from './screens/UserHome';
import RequestScreen from './screens/RequestScreen';
import CreateRequest from './screens/CreateRequest';
import ChangeInfo from './screens/ChangeInfo';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login Screen', headerShown: false }}
        />
        <Stack.Screen
          name="AttendanceScreen"
          component={AttendanceScreen}
          options={{ title: 'Attendances' }}
        />
        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="CreateUser"
          component={CreateUser}
          options={{ title: 'Create User' }}
        />
        <Stack.Screen
          name="UserHome"
          component={UserHome}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="CreateRequest"
          component={CreateRequest}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="ChangeInfo"
          component={ChangeInfo}
          options={{ title: '' }}
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
