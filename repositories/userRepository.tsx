import { createUser, delUser, getMyself, getUser, getUsers, isAdmin, signIn, updateUserInfo, updateUserPass } from "../services/userService/userService";

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
    async getUserFromFirebase(adminUID, targetUID) {
      return await getUser(adminUID, targetUID);
    }
    async updateUser(firstName, lastName) {
      return await updateUserInfo(firstName, lastName);
    }
    async updatePass(curPass, newPass) {
      return await updateUserPass(curPass, newPass);
    }
    async deleteUser() {
      return await delUser();
    }
    async isUserAdmin() {
      return await isAdmin();
    }
    async getMe() {
      return await getMyself();
    }
  }
  
export default userRepository;