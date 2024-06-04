import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getFirestore, getDoc, doc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import attendanceRepository from '../../repositories/attandanceRepository';
import requestRepository from '../../repositories/requestRepository';

const db = getFirestore();
const auth = getAuth();

const attendRepo = new attendanceRepository();
const requestRepo = new requestRepository();
 
const Attend = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [hasOngoingAttendance, setHasOngoingAttendance] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [startup, setStartup] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userRef);
      setUser(userDoc.data());
      if (await attendRepo.checkOngoing(auth.currentUser.uid)) setHasOngoingAttendance(true);
      else setHasOngoingAttendance(false);
      setStartup(false);
    };
    fetchUser();
    
  }, []);

  const handleCheckIn = async () => {
    setLoading(true);
    await attendRepo.checkInWithFirebase(auth.currentUser.uid);
    setLoading(false);
    setHasOngoingAttendance(true);
  };
  const handleCheckOut = async () => {
    setLoading(true);
    await attendRepo.checkOutWithFirebase(auth.currentUser.uid);
    setLoading(false);
    setHasOngoingAttendance(false);
  };

  if (startup) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color='#6358EC' size='large' />
      </View>
    );
  }
  const handleCreate = async () => {
    setLoading(true);
    await requestRepo.createVacationRequest(serverTimestamp(), serverTimestamp());
    setLoading(false);
  };

  const loading = isLoading ? { opacity: 0.5 } : {};

  return (
    <View style={styles.container}>
      <View style={[styles.container, loading]}>
        {user && (
          <Text style={[styles.greetingText]}>
            Hello, {user.firstName} {user.lastName}
          </Text>
        )}
        {hasOngoingAttendance ? (
          <TouchableOpacity style={[styles.button]} onPress={handleCheckOut}>
            <Text style={styles.buttonText}>Check Out</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button]} onPress={handleCheckIn}>
            <Text style={styles.buttonText}>Check In</Text>
          </TouchableOpacity>
        )}
      </View>
      {isLoading && (
      <ActivityIndicator
        style={styles.activityIndicator}
        size="large"
        color="#6358EC"
      />
    )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6358EC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 7,
    marginBottom: 5,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Attend;
