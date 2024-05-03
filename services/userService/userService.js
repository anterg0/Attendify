// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, reauthenticateWithCredential, updatePassword, EmailAuthProvider, deleteUser } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { Alert } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDfyM_pSJ79bBQywoEzB5Le6eZUWrFplvc",
  authDomain: "attendify-e4203.firebaseapp.com",
  projectId: "attendify-e4203",
  storageBucket: "attendify-e4203.appspot.com",
  messagingSenderId: "675361693235",
  appId: "1:675361693235:web:5d2afdfb34b31496664d46",
  measurementId: "G-N3MJYQHKM2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const getUser = async (adminUID, targetUID) => {
    const userRef = doc(db,'users',adminUID);
    const userSnap = await getDoc(userRef);
    if (userSnap.data().type === 'admin') {
        const targetRef = doc(db,'users',targetUID);
        const targetSnap = await getDoc(targetRef);
        return targetSnap.data();
    } else {
        console.error('You are not an admin.');
        throw new Error('You are not an admin.')
    }
};

export const updateUserInfo = async (firstName, lastName) => {
    try {
        const userRef = doc(db,'users',auth.currentUser.uid);
        await updateDoc(userRef, {
            firstName: firstName,
            lastName: lastName,
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateUserPass = async (curPass, newPass) => {
    try {
        const creds = EmailAuthProvider.credential(auth.currentUser.email,curPass);
        await reauthenticateWithCredential(auth.currentUser, creds).then(() => {
            updatePassword(auth.currentUser, newPass);
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const delUser = async () => {
    try {
        const userID = auth.currentUser.uid;
        console.log('aboba');
        await deleteDoc(doc(db, 'users', userID));
        console.log('aboba2');
        await deleteUser(auth.currentUser);
        console.log('aboba3');
    } catch (error) {
        throw error;
    }
};

export const getUsers = async (userID) => {
    const userRef = doc(db, 'users', userID);
    const userSnap = await getDoc(userRef);
    if (userSnap.data().type === 'admin') {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return userList;
    } else {
        Alert.alert('Error', 'How did we even get here?');
        return null;
    }
};

export const createUser = (email, password, firstName, lastName) => {
    try {
        const db = getFirestore();
        const secondaryApp = initializeApp(firebaseConfig, "Secondary");
        createUserWithEmailAndPassword(getAuth(secondaryApp), email, password).then((userCredentials) => {
        const usersCollection = collection(db, 'users');
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            type: 'user'
        };
        const addToDB = async () => {
            const newDoc = doc(usersCollection, userCredentials.user.uid);
            await setDoc(newDoc, newUser);
            console.log('User added to db! DOC ID: ', newDoc.id);
        }
        addToDB();
        console.log('User successfully created! ', userCredentials.user.uid);
        })
    } catch (error) {
        console.error('Error creating account:', error);
        throw error;
    }
};

export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDocRef = doc(db,'users',user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            const UserData = userDocSnap.data();
            console.log('User db data:', UserData);
            console.log('User auth data: ', user);
            return UserData;
        } else {
            console.error('User data not found in Firestore');
        }
    } catch (error) {
        console.error('Error signing in user:', error.code);
        let errorMessage = '';
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'User not found. Please check your email or sign up.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password. Please try again.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email format. Please enter a valid email address.';
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'Email is already in use. Please use a different email or sign in.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many unsuccessful login attempts. Please try again later.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your internet connection.';
                break;
            case 'auth/invalid-credential':
                errorMessage = 'Invalid credentials.'
                break;
            default:
                errorMessage = 'An error occurred. Please try again later.';
    }

    Alert.alert('Authentication Error', errorMessage);
    }
};