import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { dbDateToJsDate } from '../../services/AttendanceController/AttendanceController';

const auth = getAuth();
const db = getFirestore();

const RequestScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch the list of requests from Firestore
    const fetchRequests = async () => {
      const requestRef = collection(db, 'users', auth.currentUser.uid, 'unreviewedRequests');
      const snapshot = await getDocs(requestRef);
      const requestData = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setRequests(requestData);
    };

    fetchRequests();
  }, []);

  const renderRequestItem = ({ item }) => {
    // Extract the fields from the item
    const { id, requestType, createdAt, userUid, status, startDate, endDate } = item;

    return (
      <View style={styles.requestItemContainer}>
        <Text>Request ID: {id}</Text>
        <Text>Request Type: {requestType}</Text>
        <Text>Created At: {dbDateToJsDate(createdAt)}</Text>
        <Text>User UID: {userUid}</Text>
        <Text>Status: {status}</Text>
        <Text>Start Date: {dbDateToJsDate(startDate)}</Text>
        <Text>End Date: {dbDateToJsDate(endDate)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List of Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequestItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  requestItemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});

export default RequestScreen;