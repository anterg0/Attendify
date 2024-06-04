import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import userRepository from '../../repositories/userRepository';

const repo = new userRepository();

const CheckUsers = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const userList = await repo.getUsersFromFirebase(getAuth().currentUser.uid);
    setUsers(userList);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  // Handle pull-to-refresh
  const handleRefresh = () => {
    setRefreshing(true); // Set refreshing to true when pulling to refresh
    fetchData(); // Fetch data again
  };

  // Render loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6358EC" />
      </View>
    );
  }

  // Render users list with pull-to-refresh
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('AttendanceScreen', { userID: item.id })}>
            <View style={[styles.item, item.isCheckedIn && styles.userIsCheckedIn]}>
              <Text style={[item.isCheckedIn && styles.textIsCheckedIn]}>{item.firstName} {item.lastName}</Text>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateUser')}>
        <Text style={styles.buttonText}>Create User</Text>
        </TouchableOpacity>
    </View>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  userIsCheckedIn: {
    borderColor: '#6358EC',
    backgroundColor: '#6358EC',
  },
  textIsCheckedIn: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6358EC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 7,
    marginBottom: 5,
    minHeight: 40,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CheckUsers;
