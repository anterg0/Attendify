import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import attendanceRepository from '../../repositories/attandanceRepository';
import { Ionicons } from '@expo/vector-icons';
import userRepository from '../../repositories/userRepository';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { DeserializeDate, DeserializeDateTime, SerializeAttendancesToCSV } from 'attendify_serializer';

const db = getFirestore();
const auth = getAuth();
const attendanceRepo = new attendanceRepository();
const userRepo = new userRepository();

const AttendanceScreen = ({route}) => {
  const { userID } = (route.params === undefined) ? auth.currentUser.uid : route.params;
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userCred, setUserCred] = useState(null);

  const fetchData = async () => {
    const currentUserID = auth.currentUser.uid;
    const userDocRef = doc(db,'users',currentUserID);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.data().type === 'admin') {
      const attendanceList = await attendanceRepo.getAttendancesFromFirebase(userID);
      setAttendances(attendanceList);
      console.log(attendanceList);
      setLoading(false);
      setRefreshing(false);
    } else {
      const attendanceList = await attendanceRepo.getAttendancesFromFirebase(currentUserID);
      setAttendances(attendanceList);
      console.log(attendanceList);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchedUserCred = async() => {
      const data = await userRepo.getUserFromFirebase(auth.currentUser.uid, userID);
      setUserCred(data);
    }
    if (userID) {
      fetchedUserCred();
    }
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const saveCSVFile = async () => {
    try {
      const filePath = `${FileSystem.documentDirectory}/data.csv`;
      await FileSystem.writeAsStringAsync(filePath, SerializeAttendancesToCSV(attendances));
      console.log('File saved successfully:', filePath);
      await Sharing.shareAsync(`file://${filePath}`);
    } catch (error) {
      console.error('Error saving CSV file:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6358EC" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {userCred && (<Text style={styles.nameHeader}>{userCred.firstName} {userCred.lastName}</Text>)}
      <Text style={styles.header}>Attendance Records</Text>
      <FlatList
        data={attendances}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.id === 'ongoing') {
            return null;
          }
          return (
            <View style={styles.item}>
              {item.startDate && item.endDate && item.startDate.seconds && item.endDate.seconds ? (
                <React.Fragment>
                  <Text style={styles.sub}>Start Date:</Text>
                  <Text style={styles.sub2}>{DeserializeDateTime(item.startDate)}</Text>
                  <Text style={styles.sub}>End Date:</Text> 
                  <Text style={styles.sub2}>{DeserializeDateTime(item.endDate)}</Text>
                </React.Fragment>
              ) : (
                <Text>Error: Missing date data</Text>
              )}
            </View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      <TouchableOpacity style={styles.button} onPress={saveCSVFile}>
        <Text style={styles.export}>Export to CSV</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  export: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  sub: {
    fontSize: 15, 
    fontWeight: 'bold',
  },
  sub2: {
    fontSize: 20, 
    textTransform: 'capitalize',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nameHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6358EC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 7,
    minHeight: 40,
    marginVertical: 20,
  },
});

export default AttendanceScreen;
