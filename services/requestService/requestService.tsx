import { SnapshotDataToId } from "attendify_serializer";
import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export const createVacationRequest = async (startDate, endDate) => {
    try {
        const reqType = 'vacation';
        const requestRef = collection(db, 'users', auth.currentUser.uid, 'unreviewedRequests');
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
            hasRequests: true
        });
        await addDoc(requestRef, {
            requestType: reqType,
            createdAt: serverTimestamp(),
            userUid: auth.currentUser.uid,
            status: 'onReview',
            startDate: startDate,
            endDate: endDate
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
        await setDoc(reviewedRequestRef, updatedRequestSnap);
        if ((await getDocs(requestsRef)).empty) await updateDoc(userRef, { hasRequests: false });
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getRequests = async () => {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userType = (await getDoc(userRef)).data().type;
    if (userType === 'admin') {
        try {
            const usersRef = collection(db, 'users');
            const snapshot = await getDocs(usersRef);
            const userList = SnapshotDataToId(snapshot);
            const unreviewedRequests = [];

            for (const user of userList) {
                if (user.hasRequests) {
                    const requestsRef = collection(db, 'users', user.id, 'unreviewedRequests');
                    const requestsSnapshot = await getDocs(requestsRef);
                    const requestsList = SnapshotDataToId(requestsSnapshot);
                    unreviewedRequests.push(...requestsList);
                }
            }

            return unreviewedRequests;
        } catch (e) {
            console.error(e);
            throw e;
        }
    } else {
        const unrevReqRef = collection(db,'users',auth.currentUser.uid,'unreviewedRequests');
        const revReqRef = collection(db,'users',auth.currentUser.uid,'reviewedRequests');
    
        const unrevSnapshot = await getDocs(unrevReqRef);
        const revSnapshot = await getDocs(revReqRef);
        
        const requests = [...SnapshotDataToId(unrevSnapshot), ...SnapshotDataToId(revSnapshot)];
        return requests;
    }
};