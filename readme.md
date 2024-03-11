# Attendify (Attendance Control System)
## Anton Shapkovsky, 253505
***Description:*** Attendify is an app aimed at helping you monitor the presence of your employees. The application allows you to check in at the beginning of the working day and check out after the end of the working day. Attendify can be useful for both the administration of an organization and the employees of that organization. While the administration can check the presence of their employees at work, the employees themselves have the ability to monitor how much time they spend at work.
# System Class Diagram
![diagram](/assets/system_diagram.png)
# Data Layer:
## User Class:
The User class represents user entities within the system. Each user has the following fields:

- id (string): Unique identifier for the user.
- firstName (string): First name of the user.
- lastName (string): Last name of the user.
- type ('admin' | 'employee'): Specifies the type of user, either 'admin' or 'employee'.
- userName (string): User's login username.
- password (string): User's login password.  
## Attendance Class:
The Attendance class represents attendance records within the system. Each attendance record has the following fields:

- startDateTime (datetime): Date and time when the attendance record starts.
- endDateTime (datetime): Date and time when the attendance record ends.
- userId (string): Identifier of the user associated with this attendance record.
- status ('endedManually' | 'endedAutomatically' | 'ongoing'): Indicates the status of the attendance, whether it ended manually, ended automatically, or is currently ongoing.
  
# Domain Layer:

## User (Abstract Class):
 - create(user: User): User: Creates a new user with the provided data and returns the created user object. (Abstract method to be implemented by subclasses)
 - update(userData: User): User: Updates user information with the provided data and returns the updated user object. (Abstract method to be implemented by subclasses)
 - delete(userID: string): void: Deletes the user with the specified ID. (Abstract method to be implemented by subclasses)
 - get(userID: string): User: Retrieves user information based on the given ID. (Abstract method to be implemented by subclasses)
## Admin Class (extends User):
- getEmployeeAttendances(employeeID: string): Attendance[]: Retrieves attendance records for a specific employee identified by the employee ID.
- getEmployees(): Employee[]: Retrieves the list of employees.
## Employee Class (extends User):
- getOngoingAttendance(): Attendance: Retrieves the ongoing attendance record for the employee.
- getAttendances(): Attendance[]: Retrieves all attendance records for the employee.
# Control Layer:

## AuthController Class:
- login(userName: string, password: string): token: string: Authenticates a user based on the provided username and password, returning an authentication token.
- logout(): void: Logs out the currently authenticated user.
## AdminController Class:
- createEmployee(employeeData: Employee): Employee: Creates a new employee with the provided data and returns the created employee object.
- getEmployeeAttendances(employeeID: string): Attendance[]: Retrieves attendance records for a specific employee identified by the employee ID.
## EmployeeController Class:
- checkIn(employeeID: string): Attendance: Records the check-in time for the employee identified by the employee ID and returns the corresponding attendance object.
- checkOut(employeeID: string): Attendance: Records the check-out time for the employee identified by the employee ID and returns the corresponding attendance object.
- getAttendances(employeeID: string): Attendance[]: Retrieves all attendance records for the employee identified by the employee ID.
# UI Layer:

## EmployeeUI Class:
- checkIn(): void: Initiates the check-in process for the employee.
- checkOut(): void: Initiates the check-out process for the employee.
- displayAttendances(): void: Displays the attendance records for the employee.
## AdminUI Class:
- createEmployee(): void: Initiates the process of creating a new employee.
- viewEmployeeAttendances(employeeID: string): void: Displays attendance records for a specific employee identified by the employee ID.
## AuthUI Class:
- login(): void: Initiates the user login process.

# Employee UI Concept
![concept](/assets/design_concept.png)
# Admin UI Concept
![admin_concept](/assets/admin_concept.png)
