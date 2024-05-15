import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { dbDateToJsDate } from '../../services/AttendanceController/AttendanceController';
import requestRepository from '../../repositories/requestRepository';
import userRepository from '../../repositories/userRepository';

const auth = getAuth();
const reqRepo = new requestRepository();
const userRepo = new userRepository();

const RequestScreen = ({ navigation }) => {
  const [isAdmin, setAdmin] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of requests from Firestore
    const fetchRequests = async () => {
      setLoading(true);
      const isUserAnAdmin = await userRepo.isUserAdmin();
      setAdmin(isUserAnAdmin);
      const requestData = await reqRepo.getRequests();
      setRequests(requestData);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6358EC" />
      </View>
    );
  }

  const handleApprove = async (userID, reqID) => {
    await reqRepo.review(userID, reqID, 'approved');
  };
  const handleReject = async (userID, reqID) => {
    await reqRepo.review(userID, reqID, 'rejected');
  };
  const renderRequestItem = ({ item }) => {
    // Extract the fields from the item
    const { id, requestType, createdAt, userUid, status, startDate, endDate } = item;

    return (
      <View style={[styles.requestItemContainer, status === 'approved' ? styles.approved : status === 'rejected' ? styles.rejected : '']}>
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

  const renderUnreviewedItems = ({ item }) => {

    const { id, requestType, createdAt, userUid, status, startDate, endDate } = item;
    return (
      <View style={styles.requestItemContainer}>
        <Text>Request ID: {id}</Text>
        <Text>Request Type: {requestType}</Text>
        <Text>Created At: {dbDateToJsDate(createdAt)}</Text>
        <Text>User Name: {userUid}</Text>
        <Text>Status: {status}</Text>
        <Text>Start Date: {dbDateToJsDate(startDate)}</Text>
        <Text>End Date: {dbDateToJsDate(endDate)}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleApprove(userUid, id)}>
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} onPress={() => handleReject(userUid, id)}>
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>List of Requests</Text>
        <FlatList
          data={requests}
          keyExtractor={(item) => item}
          renderItem={renderRequestItem}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Unreviewed Requests</Text>
        <FlatList
          data={requests}
          keyExtractor={(item) => item}
          renderItem={renderUnreviewedItems}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#6358EC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 7,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approved: {
    borderColor: '#6358EC',
    borderWidth: 2,
  },
  rejected: {
    borderColor: 'red',
    borderWidth: 2,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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