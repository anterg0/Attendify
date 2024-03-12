# Attendify (Attendance Control System)
![logo](/assets/logo.jpeg)
## Anton Shpakovsky, 253505
***Description:*** Attendify is an app aimed at helping you monitor the presence of your employees. The application allows you to check in at the beginning of the working day and check out after the end of the working day. Attendify can be useful for both the administration of an organization and the employees of that organization. While the administration can check the presence of their employees at work, the employees themselves have the ability to monitor how much time they spend at work.
# Employee UI Concept
![concept](/assets/design_concept.png)
# Admin UI Concept
![admin_concept](/assets/admin_concept.png)
# System Class Diagram
![diagram](/assets/system_diagram.png)
# Data Layer

## User Entity
- id: A unique identifier for each user.
- firstName: The first name of the user.
- lastName: The last name of the user.
- type: Specifies the role of the user, either 'admin' or 'employee'.
- userName: The username used for authentication.
- password: The password associated with the user's account.
## Attendance Entity
- startDateTime: The date and time when the attendance record starts.
- endDateTime: The date and time when the attendance record ends.
- userId: The unique identifier of the user associated with the attendance.
- status: Indicates the status of the attendance, whether it was ended manually, automatically, or is still ongoing.
# Repository

## AuthService
- login(userName: string, password: string): token: string: Authenticates a user by validating the provided username and password, returning a token upon successful authentication.
- logout(): void: Logs out the currently authenticated user.
## UserController
- createUser(userData: User): User: Creates a new user with the provided user data.
- getUser(userID: string): User: Retrieves user information based on the provided user ID.
- updateUser(userData: User): User: Updates user information with the provided user data.
- deleteUser(userID: string): void: Deletes a user based on the provided user ID.
## AttendanceController
- getAttendances(userID: string): Attendance[]: Retrieves a list of attendance records associated with the specified user ID.
- checkIn(userID: string): Attendance: Records the check-in time for the specified user.
- checkOut(userID: string): Attendance: Records the check-out time for the specified user.
# UI Layer

## EmployeeUI
- checkIn(): void: Initiates the check-in process for an employee.
- checkOut(): void: Initiates the check-out process for an employee.
- displayAttendances(): void: Displays the attendance records for the logged-in employee.
## AdminUI
- createEmployee(): void: Initiates the process of creating a new employee.
- viewEmployeeAttendances(employeeID: string): void: Displays the attendance records for a specific employee identified by their ID.
## AuthUI
- login(): void: Initiates the login process, interacting with the AuthService for user authentication.
