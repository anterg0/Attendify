import { createUser, getUser, getUsers, signIn } from "../services/firebaseService/firebaseService";

class userRepository {
    async getUsersFromFirebase(userID) {
      return await getUsers(userID);
    }
  
    async createUserInFirebase(email, password, firstName, lastName) {
      return createUser(email, password, firstName, lastName);
    }
  
    async signInWithFirebase(email, password) {
      return await signIn(email, password);
    }
    async getUserFromFirebase(adminUID, targetUID) {
      return await getUser(adminUID, targetUID);
    }
  }
  
export default userRepository;