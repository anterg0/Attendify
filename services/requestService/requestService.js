import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export const createRequest = async (startDate, endDate, reqType) => {
    try {
        const requestRef = collection(db, 'users', auth.currentUser.uid, 'unreviewedRequests');
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
            hasRequests: true
        });
        await addDoc(requestRef, {
            startDate: startDate,
            endDate: endDate,
            requestType: reqType,
            createdAt: serverTimestamp(),
            userUid: auth.currentUser.uid,
            status: 'onReview'
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const reviewRequest = async (userID, requestID, verdict) => {
    try {
        const requestRef = doc(db, 'users', userID, 'unreviewedRequests', requestID);
        const requestsRef = collection(db, 'users', userID, 'unreviewedRequests');
        const requestSnap = await getDoc(requestRef);
        const reviewedRequestRef = doc(db, 'users', userID, 'reviewedRequests', requestID);
        const userRef = doc(db, 'users', userID);
        const updatedRequestSnap = {
            ...requestSnap.data(),
            reviewedBy: auth.currentUser.uid,
            reviewedAt: serverTimestamp(),
            status: verdict
        };
        await deleteDoc(requestRef);
        await addDoc(reviewedRequestRef, updatedRequestSnap);
        if ((await getDocs(requestsRef)).empty) await updateDoc(userRef, { hasRequests: false });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUnreviewedRequests = async () => {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userType = (await getDoc(userRef)).data().type;
    if (userType === 'admin') {
        try {
            const usersRef = collection(db, 'users');
            const snapshot = await getDocs(usersRef);
            const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const unreviewedRequests = [];

            for (const user of userList) {
                if (user.hasRequests) {
                    const requestsRef = collection(db, 'users', user.id, 'unreviewedRequests');
                    const requestsSnapshot = await getDocs(requestsRef);
                    const requestsList = requestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    unreviewedRequests.push(...requestsList);
                }
            }

            return unreviewedRequests;
        } catch (e) {
            console.error(e);
            throw e;
        }
    } else {
        throw new Error('You are not an admin.');
    }
};