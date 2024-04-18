// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfyM_pSJ79bBQywoEzB5Le6eZUWrFplvc",
  authDomain: "attendify-e4203.firebaseapp.com",
  projectId: "attendify-e4203",
  storageBucket: "attendify-e4203.appspot.com",
  messagingSenderId: "675361693235",
  appId: "1:675361693235:web:5d2afdfb34b31496664d46",
  measurementId: "G-N3MJYQHKM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const createUser = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.error('Error creating account:', error);
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
        console.error('Error signing in: ', error);
        throw error;
    }
};