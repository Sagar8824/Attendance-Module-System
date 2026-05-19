
# CHAPTER 3: SYSTEM ANALYSIS AND REQUIREMENTS

## 3.1 Introduction

This chapter presents a detailed analysis of the system requirements for the AttendanceIQ platform. The requirements are categorized into functional requirements (what the system must do) and non-functional requirements (how the system must perform). Use case descriptions and user stories are provided to illustrate how different stakeholders interact with the system.

## 3.2 Stakeholder Analysis

The AttendanceIQ system serves three primary stakeholder categories:

| Stakeholder | Role | Primary Needs |
|-------------|------|---------------|
| **Administrator** | System overseer | Manage teacher accounts, approve/reject registrations, reset passwords, monitor system activity |
| **Teacher** | Primary system user | Mark attendance, manage subjects, manage students, view reports, export data |
| **Student** | End consumer | View personal attendance records, track subject-wise performance, upload profile photo |

## 3.3 Functional Requirements

### 3.3.1 Administrator Module (FR-ADMIN)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-ADMIN-01 | The system shall allow initial admin account setup (one-time only) | High |
| FR-ADMIN-02 | The system shall authenticate administrators via email and password | High |
| FR-ADMIN-03 | The system shall display pending teacher registration requests | High |
| FR-ADMIN-04 | The system shall allow administrators to approve teacher accounts | High |
| FR-ADMIN-05 | The system shall allow administrators to reject teacher accounts | High |
| FR-ADMIN-06 | The system shall allow administrators to delete teacher accounts | Medium |
| FR-ADMIN-07 | The system shall allow administrators to reset teacher passwords | Medium |
| FR-ADMIN-08 | The system shall allow administrators to revoke previously approved access | Medium |
| FR-ADMIN-09 | The system shall allow administrators to reinstate previously rejected accounts | Low |
| FR-ADMIN-10 | The system shall support filtering teachers by department | Medium |
| FR-ADMIN-11 | The system shall display teacher counts by status (pending, approved, rejected) | Low |

### 3.3.2 Teacher Authentication Module (FR-TAUTH)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-TAUTH-01 | The system shall allow teachers to self-register with name, email, password, and department | High |
| FR-TAUTH-02 | The system shall validate email format and password minimum length (4 characters) | High |
| FR-TAUTH-03 | The system shall prevent duplicate email registration | High |
| FR-TAUTH-04 | The system shall set newly registered accounts to "pending" status | High |
| FR-TAUTH-05 | The system shall authenticate approved teachers via email and password | High |
| FR-TAUTH-06 | The system shall deny login to pending and rejected accounts with appropriate messages | High |
| FR-TAUTH-07 | The system shall issue JWT tokens upon successful authentication | High |
| FR-TAUTH-08 | The system shall support department selection from predefined list (IT, CS, EC, ME, CE, EE) | Medium |

### 3.3.3 Attendance Module (FR-ATT)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-ATT-01 | The system shall provide a swipe-based card interface for marking attendance | High |
| FR-ATT-02 | The system shall support subject-wise attendance marking | High |
| FR-ATT-03 | The system shall allow date selection for attendance marking | High |
| FR-ATT-04 | The system shall display student photo, name, roll number during marking | High |
| FR-ATT-05 | The system shall support both touch (mobile) and mouse (desktop) swipe gestures | High |
| FR-ATT-06 | The system shall provide visual feedback (Present/Absent overlay) during swipe | Medium |
| FR-ATT-07 | The system shall display progress bar during attendance session | Medium |
| FR-ATT-08 | The system shall show session summary after marking is complete | High |
| FR-ATT-09 | The system shall allow bulk submission of attendance records | High |
| FR-ATT-10 | The system shall prevent duplicate attendance records (same student, subject, date) | High |
| FR-ATT-11 | The system shall allow editing of existing attendance records (toggle Present/Absent) | Medium |
| FR-ATT-12 | The system shall support filtering attendance history by date, name, and status | Medium |
| FR-ATT-13 | The system shall compute attendance percentage per student | High |
| FR-ATT-14 | The system shall identify defaulters (below 75% attendance) | High |
| FR-ATT-15 | The system shall export attendance data to Excel format | Medium |

### 3.3.4 Student Management Module (FR-STU)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-STU-01 | The system shall allow teachers to add individual students with name, roll number, department, semester, password, and optional photo | High |
| FR-STU-02 | The system shall prevent duplicate roll number registration | High |
| FR-STU-03 | The system shall allow bulk student import via Excel file | High |
| FR-STU-04 | The system shall allow bulk student import via ZIP file (Excel + photos) | Medium |
| FR-STU-05 | The system shall automatically match photos to students by roll number | Medium |
| FR-STU-06 | The system shall hash student passwords before storage | High |
| FR-STU-07 | The system shall allow deletion of individual students and their attendance | Medium |
| FR-STU-08 | The system shall allow deletion of all students and attendance data | Low |
| FR-STU-09 | The system shall filter students by department and semester | Medium |

### 3.3.5 Subject Management Module (FR-SUB)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-SUB-01 | The system shall allow adding subjects with name, code, type, semester, and department | High |
| FR-SUB-02 | The system shall support two subject types: Theory and Practical | High |
| FR-SUB-03 | The system shall prevent duplicate subject codes within the same department and semester | High |
| FR-SUB-04 | The system shall allow deletion of subjects | Medium |
| FR-SUB-05 | The system shall filter subjects by department, semester, and type | Medium |

### 3.3.6 Student Portal Module (FR-SPORT)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-SPORT-01 | The system shall authenticate students via roll number and password | High |
| FR-SPORT-02 | The system shall display overall attendance percentage with circular progress indicator | High |
| FR-SPORT-03 | The system shall display subject-wise attendance with color-coded indicators | High |
| FR-SPORT-04 | The system shall display date-wise attendance history per subject | Medium |
| FR-SPORT-05 | The system shall flag subjects with attendance below 75% | High |
| FR-SPORT-06 | The system shall allow students to upload/update profile photos | Medium |
| FR-SPORT-07 | The system shall display mini-statistics (classes attended, missed, total subjects) | Low |
| FR-SPORT-08 | The system shall support switching between Theory and Practical subject views | Low |

### 3.3.7 Dashboard Module (FR-DASH)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-DASH-01 | The system shall display total student count | High |
| FR-DASH-02 | The system shall display today's attendance count | High |
| FR-DASH-03 | The system shall display defaulter count | High |
| FR-DASH-04 | The system shall display time-of-day greeting with teacher name | Low |
| FR-DASH-05 | The system shall provide quick-action navigation cards | Medium |
| FR-DASH-06 | The system shall display defaulter alert banner when defaulters exist | Medium |

## 3.4 Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-01 | **Performance** | Pages shall load within 3 seconds under normal network conditions |
| NFR-02 | **Performance** | The system shall handle concurrent access by up to 100 simultaneous users |
| NFR-03 | **Security** | All passwords shall be hashed using bcrypt with a minimum of 10 salt rounds |
| NFR-04 | **Security** | Authentication tokens shall expire after 24 hours |
| NFR-05 | **Security** | API endpoints for admin operations shall require valid admin JWT |
| NFR-06 | **Usability** | The interface shall be responsive across screen sizes (320px to 1920px) |
| NFR-07 | **Usability** | The system shall provide meaningful error messages for all failure scenarios |
| NFR-08 | **Reliability** | The system shall handle server errors gracefully without exposing stack traces |
| NFR-09 | **Compatibility** | The system shall function on Chrome, Firefox, Safari, and Edge browsers |
| NFR-10 | **Maintainability** | The codebase shall follow component-based architecture for modularity |
| NFR-11 | **Data Integrity** | The database shall enforce unique constraints on roll numbers, emails, and attendance records |
| NFR-12 | **Scalability** | MongoDB document-based storage shall accommodate growing data volumes |
| NFR-13 | **File Handling** | Uploaded photos shall not exceed 2MB per file |
| NFR-14 | **File Handling** | ZIP uploads shall not exceed 50MB |

## 3.5 Use Case Descriptions

### Use Case 1: Teacher Registration and Approval

**Actor**: Teacher, Administrator

**Precondition**: Admin account exists in the system

**Flow**:
1. Teacher navigates to the registration page
2. Teacher fills in name, email, department, and password
3. System validates input (email format, password length, duplicate check)
4. System creates teacher account with "pending" status
5. System displays success confirmation with "Pending Approval" status
6. Administrator logs into the Admin Dashboard
7. Administrator views pending registration requests
8. Administrator reviews teacher details (name, email, department, registration date)
9. Administrator clicks "Approve" or "Reject"
10. System updates teacher status accordingly
11. If approved, teacher can now login; if rejected, login is denied with appropriate message

**Postcondition**: Teacher account status is updated

### Use Case 2: Swipe-Based Attendance Marking

**Actor**: Teacher

**Precondition**: Teacher is logged in, subjects and students exist for the selected criteria

**Flow**:
1. Teacher navigates to "Mark Attendance" page
2. Teacher selects date, department (auto-selected based on teacher's department), semester
3. Teacher selects subject type (Theory/Practical)
4. System loads available subjects for the selected criteria
5. Teacher selects a specific subject
6. Teacher clicks "Start Attendance"
7. System loads all students matching department and semester, sorted by roll number
8. System displays first student as a swipeable card with photo, name, and details
9. Teacher swipes left (Present) or right (Absent) or uses buttons
10. System records the attendance and advances to the next student
11. Progress bar updates with each swipe
12. After all students are processed, system displays session summary (Present count, Absent count)
13. Teacher clicks "Save & View Summary"
14. System submits all attendance records to the server
15. System navigates to Attendance Summary page with detailed breakdown

**Postcondition**: Attendance records are saved in the database

### Use Case 3: Student Viewing Attendance

**Actor**: Student

**Precondition**: Student account exists, attendance records exist

**Flow**:
1. Student logs in using roll number and password
2. System displays personalized dashboard with profile card and circular progress chart
3. Student views overall attendance percentage and mini-statistics
4. Student selects Theory or Practical tab to view subject-wise breakdown
5. Each subject card shows attendance percentage, progress bar, and class count
6. Student clicks on a subject to view detailed date-wise history
7. System displays chronological list of attendance records with status badges
8. Student can return to the main dashboard at any time

**Postcondition**: Student has viewed their attendance information

## 3.6 Summary

This chapter has established a comprehensive set of 60+ functional requirements and 14 non-functional requirements across seven functional modules. Three detailed use cases illustrate the primary user workflows. These requirements serve as the foundation for the system design presented in the next chapter.

---
