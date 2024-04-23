import { createUser, getUsers, signIn } from "../services/firebaseService/firebaseService";

class userRepository {
    async getUsersFromFirebase(userID) {
      return await getUsers(userID);
    }
  
    async createUserInFirebase(email, password, firstName, lastName) {
      return await createUser(email, password, firstName, lastName);
    }
  
    async signInWithFirebase(email, password) {
      return await signIn(email, password);
    }
  }
  
export default userRepository;