import { checkIn, checkOngoingAttendance, checkOut, exportToCSV, getAttendances } from "../services/AttendanceController/AttendanceController";


class attendanceRepository {
    async getAttendancesFromFirebase(userID) {
        return await getAttendances(userID);
    }
    async checkInWithFirebase(userID) {
        return await checkIn(userID);
    }
    async checkOutWithFirebase(userID) {
        return await checkOut(userID);
    }
    async checkOngoing(userID) {
        return await checkOngoingAttendance(userID);
    }
  }
  
export default attendanceRepository;