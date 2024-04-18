// Import necessary modules
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const AttendanceScreen = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch attendances from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const auth = getAuth();
      const attendancesRef = collection(db, 'users', auth.currentUser.uid, 'attendances');
      const snapshot = await getDocs(attendancesRef);
      const attendanceList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAttendances(attendanceList);
      console.log(attendanceList);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Render loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6358EC" />
      </View>
    );
  }

  // Render attendance list
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance Records</Text>
      <FlatList
        data={attendances}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.startDate && item.endDate && item.startDate.seconds && item.endDate.seconds ? (
              <React.Fragment>
                <Text>Start Date: {new Date(item.startDate.seconds * 1000 + item.startDate.nanoseconds / 1000000).toLocaleString()} {console.log(item)}</Text>
                <Text>End Date: {new Date(item.endDate.seconds * 1000 + item.endDate.nanoseconds / 1000000).toLocaleString()}</Text>
              </React.Fragment>
            ) : (
              <Text>Error: Missing date data</Text>
            )}
            {/* Add more fields as needed */}
          </View>
        )}
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

export default AttendanceScreen;
