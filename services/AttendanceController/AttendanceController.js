import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

const db = getFirestore();

export const checkIn = async (userID) => {
  const attendanceRef = doc(db, 'users', userID, 'attendances', 'ongoing');
  await setDoc(attendanceRef, {
    startDate: serverTimestamp(),
  });
  const userRef = doc(db, 'users', userID);
  await updateDoc(userRef, {
    isCheckedIn: true,
  });
  console.log('Checked in successfully!');
};

export const checkOut = async (userID) => {
  try {
    const attendanceRef = doc(db, 'users', userID, 'attendances', 'ongoing');
    const finalAttendance = collection(db, 'users', userID, 'attendances');
    const attendanceSnap = await getDoc(attendanceRef);
    await deleteDoc(attendanceRef);
    await addDoc(finalAttendance, {
      startDate: attendanceSnap.data().startDate,
      endDate: serverTimestamp(),
    });
    const userRef = doc(db, 'users', userID);
    await updateDoc(userRef, {
      isCheckedIn: false,
    });
  } catch (error) {
    console.error('ERROR: ', error);
    throw error;
  }
  console.log('Checked out successfully!');
};

export const getAttendances = async (userID) => {
  const attendanceRef = collection(db, 'users', userID, 'attendances');
  const snapshot = await getDocs(attendanceRef);
  const attendanceList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  attendanceList.sort((a, b) => {
    const aStartDate = a.startDate.toDate();
    const bStartDate = b.startDate.toDate();
    return aStartDate - bStartDate;
  });
  return attendanceList;
};

export const checkOngoingAttendance = async (userID) => {
  const userRef = doc(db, 'users', userID);
  const user = await getDoc(userRef);
  return user.data().isCheckedIn;
};