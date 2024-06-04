import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { getAuth } from 'firebase/auth';
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
  const [startup, setStartup] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRequests = async () => {
    const isUserAnAdmin = await userRepo.isUserAdmin();
    setAdmin(isUserAnAdmin);
    const requestData = await reqRepo.getRequests();
    setRequests(requestData);
    setStartup(false);
    setRefreshing(false);
  };

  const getUsersName = async ( uid ) => {
    const user = await userRepo.getUserFromFirebase(auth.currentUser.uid, uid);
    return `${user.firstName} ${user.lastName}`;
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true); 
    fetchRequests();
  };

  if (startup) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6358EC" />
      </View>
    );
  }

  const isLoading = loading ? { opacity: 0.5 } : {};

  const handleReview = async (userID, reqID, verdict) => {
    setLoading(true);
    await reqRepo.review(userID, reqID, verdict);
    await fetchRequests();
    setLoading(false);
  };
  const renderRequestItem = ({ item }) => {
    // Extract the fields from the item
    const { id, requestType, createdAt, userUid, status, startDate, endDate } = item;

    return (
      <View style={[styles.mainContainer, styles[`${status}MainContainer`]]}>
        <View style={styles.topContainer}>
          {/* <Text>{`${requestType.toUpperCase()}\nFrom: ${DeserializeDate(startDate)} Until: ${DeserializeDate(endDate)}`}</Text> */}
          <Text style={styles.sub}>{`Request Type:`}</Text>
          <Text style={styles.sub2}>{`${requestType}`}</Text>
          <Text style={styles.sub}>{`From:`}</Text>
          <Text style={styles.sub2}>{`${DeserializeDate(startDate)}`}</Text>
          <Text style={styles.sub}>{`Until:`}</Text>
          <Text style={styles.sub2}>{`${DeserializeDate(endDate)}`}</Text>
        </View>
        <View style={[styles.bottomContainer, styles[status]]}>
          <Text style={[styles[`${status}Text`], styles.textStyle]}>
            {status === 'onReview' ? 'in review' : status}
          </Text>
        </View>
      </View>
    );
  };

  const renderUnreviewedItems = ({ item }) => {

    const { id, requestType, createdAt, userUid, status, startDate, endDate } = item;
    const fullName = getUsersName(userUid);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.sub}>Requested By:</Text>
          <Text style={styles.sub2}>{fullName}</Text>
          <Text style={styles.sub}>Request Type:</Text>
          <Text style={styles.sub2}>{requestType}</Text>
          <Text style={styles.sub}>Start Date:</Text>
          <Text style={styles.sub2}>{DeserializeDate(startDate)}</Text>
          <Text style={styles.sub}>End Date:</Text>
          <Text style={styles.sub2}>{DeserializeDate(endDate)}</Text>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, {borderBottomLeftRadius: 13}]} onPress={() => handleReview(userUid, id, 'approved')}>
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, {backgroundColor: 'red', borderBottomRightRadius: 13}]} onPress={() => handleReview(userUid, id, 'rejected')}>
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('CreateRequest')}>
          <Text style={styles.buttonText}>Create Request</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={[styles.container, isLoading]}>
        <Text style={styles.heading}>Unreviewed Requests</Text>
        <FlatList
          data={requests}
          keyExtractor={(item) => item}
          renderItem={renderUnreviewedItems}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      {loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#6358EC"
        />
      )}        
      </View>
    );
  }
};

const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub: {
    fontSize: 15, 
    fontWeight: 'bold',
  },
  sub2: {
    fontSize: 20, 
    textTransform: 'capitalize',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#6358EC',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
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
  container: {
    flex: 1,
    padding: 20,
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
  textStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  approvedText: {
    color: 'white',
  },
  rejectedText: {
    color: 'white',
  },
  onReviewText: {
    color: 'black',
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
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1, 
    minHeight: 130,
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
    height: 35,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    justifyContent: 'center',
  },
});

export default RequestScreen;