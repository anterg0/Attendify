import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDocs, getDoc } from 'firebase/firestore';
// import attendanceRepository from '../repositories/attandanceRepository.js';


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
let userAuthenticated = false;

// const checkIn = async () => {
//     if (userAuthenticated) {
//         const repo = new attendanceRepository();
//         await repo.checkInWithFirebase(auth.currentUser.uid);
//     } else {
//         console.log('Error: You must sign in to check in.');
//     }
// };

// const checkOut = async () => {
//     if (userAuthenticated) {
//         const repo = new attendanceRepository();
//         await repo.checkOutWithFirebase(auth.currentUser.uid);
//     } else {
//         console.log('Error: You must sign in to check out.');
//     }
// };

const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        userAuthenticated = true;
        console.log('User signed in:', user.email);
    } catch (error) {
        console.error('Error signing in: ', error);
    }
};

const createUser = async (email, password, firstName, lastName) => {
    if (userAuthenticated && (await getDoc((new doc(db, 'users', auth.currentUser.uid)))).data().type === 'admin') {
    const appSecondary = initializeApp(firebaseConfig, "Secondary");
    createUserWithEmailAndPassword(getAuth(appSecondary), email, password)
        .then((userCredentials) => {
            const usersCollection = collection(db, 'users');
            const newUser = {
                firstName: firstName,
                lastName: lastName,
                type: 'user',
            };
            const addToDB = async () => {
                const newDoc = doc(usersCollection, userCredentials.user.uid);
                await setDoc(newDoc, newUser);
                console.log('User added to db! DOC ID: ', newDoc.id);
            };
            addToDB();
            console.log('User successfully created! ', userCredentials.user.uid);
        })
        .catch((error) => {
            console.log('ERROR: ', error);
        });
    } else {
        console.log('Error: You need to sign in to create a user.');
    }
};

const getAllUsers = async () => {
    if (userAuthenticated) {
        const db = getFirestore();
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(userList);
    } else {
        console.log('Error: You must sign in to get all users.');
    }
};

const getAttendances = async ({ userID }) => {
    if (userAuthenticated) {
        const currentUserID = auth.currentUser.uid;
        const userDocRef = doc(db,'users',currentUserID);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.data().type === 'admin') {
          const attendanceRef = collection(db, 'users', userID, 'attendances');
          const snapshot = await getDocs(attendanceRef);
          const attendanceList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log(attendanceList);
          return attendanceList;
        } else {
          const attendanceRef = collection(db, 'users', currentUserID, 'attendances');
          const snapshot = await getDocs(attendanceRef);
          const attendanceList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log(attendanceList);
          return attendanceList;
        }
    } else {
        console.log('Error: You must sign in to get attendances.');
    }
  };

const getUser = async ({ userID }) => {
    if (userAuthenticated) {
        const userDocRef = doc(db, 'users', userID);
        const userDocSnapshot = await getDoc(userDocRef);
        console.log(userDocSnapshot.data());
        return userDocSnapshot.data();
    } else {
        console.log('Error: You must sign in to get user information.');
    }
};

// Console interface for testing
const testConsoleInterface = async () => {
    console.log('Welcome to the Firebase Console Interface!');
    console.log('Commands:');
    console.log('1. Sign In');
    console.log('2. Create User');
    console.log('3. Get User');
    console.log('4. Get All Users');
    console.log('5. Check In');
    console.log('6. Get Attendances');
    console.log('7. Check Out');
    console.log('0. Exit');

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const askQuestion = (question) => {
        return new Promise((resolve) => {
            readline.question(question, (answer) => {
                resolve(answer);
            });
        });
    };

    while (true) {
        const choice = await askQuestion('Enter your choice: ');

        switch (choice) {
            case '1':
                const email = await askQuestion('Enter email: ');
                const password = await askQuestion('Enter password: ');
                await signIn(email, password);
                break;
            case '2':
                const newUserEmail = await askQuestion('Enter email: ');
                const newUserPassword = await askQuestion('Enter password: ');
                const newUserFirstName = await askQuestion('Enter first name: ');
                const newUserLastName = await askQuestion('Enter last name: ');
                await createUser(newUserEmail, newUserPassword, newUserFirstName, newUserLastName);
                break;
            case '3':
                const getUserID = await askQuestion('Enter user ID: ');
                await getUser({ userID: getUserID });
                break;
            case '4':
                await getAllUsers();
                break;
            case '5':
                await checkIn();
                break;
            case '6':
                const getAttendanceUserID = await askQuestion('Enter user ID: ');
                await getAttendances({ userID: getAttendanceUserID });
                break;
            case '7':
                await checkOut();
                break;
            case '0':
                console.log('Exiting console interface.');
                readline.close();
                return;
            default:
                console.log('Invalid choice. Please try again.');
                break;
        }
    }
};

testConsoleInterface();