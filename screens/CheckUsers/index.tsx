// Import necessary modules
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';

const CheckUsers = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state

  // Fetch users from Firestore
  const fetchData = async () => {
    const db = getFirestore();
    const auth = getAuth();
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
    setLoading(false);
    setRefreshing(false); // Set refreshing to false when data is fetched
  };

  // Fetch data on initial load and when screen comes into focus
  useEffect(() => {
    fetchData();
  }, []);

  // Use useFocusEffect to refetch data when screen comes into focus
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
            <View style={styles.item}>
              <Text>{item.firstName} {item.lastName}</Text>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
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
});

export default CheckUsers;
