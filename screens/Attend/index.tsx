import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

const Attend = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userRef);
      setUser(userDoc.data());
    };

    fetchUser();
  }, []);

  const handleCreateAttendance = async () => {
    const attendanceRef = collection(db, 'users', auth.currentUser.uid, 'attendances');
    await addDoc(attendanceRef, {
      startDate: serverTimestamp(),
      endDate: serverTimestamp(),
    });
    console.log('Attendance created successfully!');
  };

  return (
    <View style={styles.container}>
      {user && (
        <Text style={styles.greetingText}>
          Hello, {user.firstName} {user.lastName}
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleCreateAttendance}>
        <Text style={styles.buttonText}>Get to work!</Text>
      </TouchableOpacity>
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
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Attend;
