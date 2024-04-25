import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import attendanceRepository from '../../repositories/attandanceRepository';

const db = getFirestore();
const auth = getAuth();

const attendRepo = new attendanceRepository();
 
const Attend = () => {
  const [user, setUser] = useState(null);
  const [hasOngoingAttendance, setHasOngoingAttendance] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userRef);
      setUser(userDoc.data());
      if (await attendRepo.checkOngoing(auth.currentUser.uid)) setHasOngoingAttendance(true);
      else setHasOngoingAttendance(false);
    };

    fetchUser();
  }, []);

  const handleCheckIn = async () => {
    await attendRepo.checkInWithFirebase(auth.currentUser.uid);
    setHasOngoingAttendance(true);
  };
  const handleCheckOut = async () => {
    await attendRepo.checkOutWithFirebase(auth.currentUser.uid);
    setHasOngoingAttendance(false);
  };

  return (
    <View style={styles.container}>
      {user && (
        <Text style={styles.greetingText}>
          Hello, {user.firstName} {user.lastName}
        </Text>
      )}
      {hasOngoingAttendance ? (
        <TouchableOpacity style={styles.button} onPress={handleCheckOut}>
          <Text style={styles.buttonText}>Check Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleCheckIn}>
          <Text style={styles.buttonText}>Check In</Text>
        </TouchableOpacity>
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
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Attend;
