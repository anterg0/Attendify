import { createRequest, reviewRequest, getUnreviewedRequests } from "../services/requestService/requestService.js";
import { getUser, updateUserInfo, updateUserPass, delUser, getUsers, createUser, signIn } from "../services/userService/userService.js";
import { checkIn, checkOut, getAttendances, checkOngoingAttendance } from "../services/AttendanceController/AttendanceController.js";


const mainMenu = async () => {
    console.log("\n=== Welcome to Firebase Console Menu ===");
    console.log("1. Sign In");
    console.log("2. Check In");
    console.log("3. Check Out");
    console.log("4. Get Attendances (admin)");
    console.log("5. Get All Users");
    console.log("6. Create Request");
    console.log("7. Review Request");
    console.log("8. Exit");

    const choice = parseInt(await askQuestion("Enter your choice: "));
    switch (choice) {
        case 1:
            await signInMenu();
            break;
        case 2:
            await checkInMenu();
            break;
        case 3:
            await checkOutMenu();
            break;
        case 4:
            await getAttendancesMenu();
            break;
        case 5:
            await getAllUsers();
            break;
        case 6:
            await createRequestMenu();
            break;
        case 7:
            await reviewRequestMenu();
            break;
        case 8:
            console.log("Exiting...");
            return;
        default:
            console.log("Invalid choice. Please try again.");
            break;
    }

    mainMenu(); // Return to main menu
};

const signInMenu = async () => {
    const email = await askQuestion("Enter your email: ");
    const password = await askQuestion("Enter your password: ");
    await signIn(email, password);
};

const checkInMenu = async () => {
    const userID = await askQuestion("Enter your userID: ");
    await checkIn(userID);
};

const checkOutMenu = async () => {
    const userID = await askQuestion("Enter your userID: ");
    await checkOut(userID);
};

const getAttendancesMenu = async () => {
    const userID = await askQuestion("Enter the user's ID: ");
    const attendances = await getAttendances(userID);
    console.log("Attendances:", attendances);
};

const getAllUsers = async () => {
    const userID = await askQuestion("Enter your userID: ");
    const users = await getUsers(userID);
    console.log("All Users:", users);
};

const createRequestMenu = async () => {
    const startDate = await askQuestion("Enter start date (YYYY-MM-DD): ");
    const endDate = await askQuestion("Enter end date (YYYY-MM-DD): ");
    const reqType = await askQuestion("Enter request type: ");
    await createRequest(startDate, endDate, reqType);
};

const reviewRequestMenu = async () => {
    const userID = await askQuestion("Enter reviewer's userID: ");
    const requestID = await askQuestion("Enter requestID: ");
    const verdict = await askQuestion("Enter verdict (approve/reject): ");
    await reviewRequest(userID, requestID, verdict);
};

const askQuestion = (question) => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        readline.question(question, (answer) => {
            readline.close();
            resolve(answer.trim());
        });
    });
};

mainMenu(); // Start the program by calling the main menu