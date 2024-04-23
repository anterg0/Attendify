import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, serverTimestamp } from "firebase/firestore";

const db = getFirestore();

export const createAttendance = async (userID) => {
    const attendanceRef = collection(db, 'users', userID, 'attendances');
    await addDoc(attendanceRef, {
      startDate: serverTimestamp(),
      endDate: serverTimestamp(),
    });
    console.log('Attendance created successfully!');
  };

export const getAttendances = async (userID) => {
    const attendanceRef = collection(db, 'users', userID, 'attendances');
    const snapshot = await getDocs(attendanceRef);
    const attendanceList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return attendanceList;
};