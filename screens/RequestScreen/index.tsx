import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { dbDateToJsDate } from '../../services/AttendanceController/AttendanceController';
import requestRepository from '../../repositories/requestRepository';
import userRepository from '../../repositories/userRepository';
import { DeserializeDate } from 'attendify_serializer';

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
      <View style={[styles.mainContainer, styles[`${status}MainContainer`]]}>
        <View style={styles.topContainer}>
          <Text>{`${requestType.toUpperCase()}\nFrom: ${DeserializeDate(startDate)} Until: ${DeserializeDate(endDate)}`}</Text>
        </View>
        <View style={[styles.bottomContainer, styles[status]]}>
          <Text style={styles[`${status}Text`]}>
            {status === 'onReview' ? 'in review' : status}
          </Text>
        </View>
      </View>
    );
  };

  const renderUnreviewedItems = ({ item }) => {

    const { id, requestType, createdAt, userUid, status, startDate, endDate } = item;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text>Request Type: {requestType}</Text>
          <Text>User Name: {userUid}</Text>
          <Text>Start Date: {dbDateToJsDate(startDate)}</Text>
          <Text>End Date: {dbDateToJsDate(endDate)}</Text>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, {borderBottomLeftRadius: 13}]} onPress={() => handleApprove(userUid, id)}>
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, {backgroundColor: 'red', borderBottomRightRadius: 13}]} onPress={() => handleReject(userUid, id)}>
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
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#6358EC',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderWidth: 1,
    backgroundColor: '#6358EC',
  },
  rejected: {
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'red',
  },
  onReview: {

  },
  approvedText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  rejectedText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  onReviewText: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  approvedMainContainer: {
    borderColor: '#6358EC',
  },
  rejectedMainContainer: {
    borderColor: 'red',
  },
  onReviewMainContainer: {

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
  mainContainer: {
    width: 330,
    height: 130,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15, 
    marginBottom: 15,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 5,
    alignItems: 'center',
  },
  bottomContainer: {
    height: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    justifyContent: 'center',
  },
});

export default RequestScreen;