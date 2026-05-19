
# CHAPTER 6: TESTING AND VALIDATION

## 6.1 Introduction

This chapter presents the testing strategy employed to validate the AttendanceIQ system. Testing was conducted across multiple levels—unit testing, integration testing, and user acceptance testing—to ensure that the system meets the functional and non-functional requirements specified in Chapter 3.

## 6.2 Testing Strategy

The testing approach followed the **Testing Pyramid** methodology:

```
         /\
        /  \        ← UAT (Manual, User-driven)
       /    \
      /──────\      ← Integration Tests (API-level)
     /        \
    /──────────\    ← Unit Tests (Component/Function-level)
   /____________\
```

- **Unit Tests**: Validate individual functions and components in isolation
- **Integration Tests**: Verify API endpoints and database interactions
- **User Acceptance Tests**: End-to-end validation of user workflows

## 6.3 Unit Test Cases

### 6.3.1 Authentication Module Tests

| Test ID | Test Case | Input | Expected Output | Status |
|---------|-----------|-------|-----------------|--------|
| UT-01 | Teacher registration with valid data | name, email, password, department | 200 OK, "Registration successful" | ✅ Pass |
| UT-02 | Registration with missing email | name, password, department (no email) | 400, "Saare fields zaroori hain" | ✅ Pass |
| UT-03 | Registration with invalid department | department="XYZ" | 400, "Invalid department" | ✅ Pass |
| UT-04 | Registration with invalid email format | email="notanemail" | 400, "Valid email daalo" | ✅ Pass |
| UT-05 | Registration with short password | password="ab" | 400, "Password kam se kam 4 characters" | ✅ Pass |
| UT-06 | Registration with duplicate email | Existing email | 400, "Yeh email already registered hai" | ✅ Pass |
| UT-07 | Login with valid approved credentials | Valid email + password | 200, JWT token returned | ✅ Pass |
| UT-08 | Login with pending account | Pending teacher email | 403, "account abhi pending hai" | ✅ Pass |
| UT-09 | Login with rejected account | Rejected teacher email | 403, "account reject ho gaya hai" | ✅ Pass |
| UT-10 | Login with wrong password | Valid email + wrong password | 400, "Password galat hai" | ✅ Pass |
| UT-11 | Login with unregistered email | Non-existent email | 400, "Email registered nahi hai" | ✅ Pass |

### 6.3.2 Student Module Tests

| Test ID | Test Case | Input | Expected Output | Status |
|---------|-----------|-------|-----------------|--------|
| UT-12 | Add student with valid data | All required fields | 200, "Student added successfully" | ✅ Pass |
| UT-13 | Add student with duplicate roll number | Existing roll number | 400, "Roll number already exists" | ✅ Pass |
| UT-14 | Add student with photo upload | Form data with image file | 200, photo filename saved | ✅ Pass |
| UT-15 | Add student with non-image file | Form data with .pdf file | Error, "Sirf image upload kar sakte hain" | ✅ Pass |
| UT-16 | Add student with oversized photo | Image > 2MB | Error, file size limit | ✅ Pass |
| UT-17 | Get all students (no filter) | No query params | 200, all students returned | ✅ Pass |
| UT-18 | Get students filtered by department | department=IT | 200, only IT students | ✅ Pass |
| UT-19 | Delete student | Valid student ID | 200, student + attendance deleted | ✅ Pass |
| UT-20 | Delete all students | No params | 200, all students + attendance cleared | ✅ Pass |
| UT-21 | Student login with valid credentials | Valid rollNumber + password | 200, student data (no password) | ✅ Pass |
| UT-22 | Student login with wrong roll number | Non-existent rollNumber | 404, "Student not found" | ✅ Pass |
| UT-23 | Student login with wrong password | Valid roll + wrong password | 401, "Invalid password" | ✅ Pass |

### 6.3.3 Attendance Module Tests

| Test ID | Test Case | Input | Expected Output | Status |
|---------|-----------|-------|-----------------|--------|
| UT-24 | Mark bulk attendance (new records) | Array of attendance objects | 200, "Attendance saved" | ✅ Pass |
| UT-25 | Mark attendance for existing record | Same student, subject, date | 200, existing record updated | ✅ Pass |
| UT-26 | Get attendance by date | date query param | 200, filtered records | ✅ Pass |
| UT-27 | Get attendance by date + subject | date + subjectId params | 200, double-filtered records | ✅ Pass |
| UT-28 | Get student attendance by roll number | Valid roll number | 200, student + attendance array | ✅ Pass |
| UT-29 | Get percentage statistics | No params | 200, array with percentage calculations | ✅ Pass |
| UT-30 | Get dashboard stats | No params | 200, {totalStudents, todayAttendance, defaulters} | ✅ Pass |
| UT-31 | Update attendance status | Valid ID + status "Absent" | 200, updated record | ✅ Pass |
| UT-32 | Update with invalid status | status="Late" | 400, "Invalid status" | ✅ Pass |
| UT-33 | Update non-existent record | Invalid ID | 404, "Record nahi mila" | ✅ Pass |

### 6.3.4 Subject Module Tests

| Test ID | Test Case | Input | Expected Output | Status |
|---------|-----------|-------|-----------------|--------|
| UT-34 | Add subject with valid data | name, code, type, semester, department | 200, subject object | ✅ Pass |
| UT-35 | Add duplicate subject | Same code + department + semester | 400, "Subject already exist" | ✅ Pass |
| UT-36 | Get subjects with filters | department + semester + type | 200, filtered array | ✅ Pass |
| UT-37 | Delete subject | Valid subject ID | 200, "Subject delete ho gaya" | ✅ Pass |

### 6.3.5 Admin Module Tests

| Test ID | Test Case | Input | Expected Output | Status |
|---------|-----------|-------|-----------------|--------|
| UT-38 | Admin setup (first time) | name, email, password | 200, "Admin create ho gaya" | ✅ Pass |
| UT-39 | Admin setup (already exists) | Any input | 400, "Admin already exist" | ✅ Pass |
| UT-40 | Admin login with valid credentials | Valid email + password | 200, JWT + admin data | ✅ Pass |
| UT-41 | Approve pending teacher | Valid teacher ID + admin token | 200, status changed to "approved" | ✅ Pass |
| UT-42 | Reject teacher | Valid teacher ID + admin token | 200, status changed to "rejected" | ✅ Pass |
| UT-43 | Access admin route without token | No Authorization header | 401, "Token nahi mila" | ✅ Pass |
| UT-44 | Access admin route with teacher token | Teacher JWT | 403, "Admin access required" | ✅ Pass |
| UT-45 | Reset teacher password | ID + new password + admin token | 200, "Password reset ho gaya" | ✅ Pass |

## 6.4 Integration Test Cases

### 6.4.1 End-to-End Workflow: Teacher Registration → Approval → Login

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | POST `/auth/register` with teacher data | Teacher created with status "pending" | ✅ Pass |
| 2 | POST `/auth/login` with new credentials | 403, login denied (pending) | ✅ Pass |
| 3 | POST `/admin/login` with admin credentials | Admin JWT received | ✅ Pass |
| 4 | GET `/admin/teachers/pending` with admin token | New teacher appears in list | ✅ Pass |
| 5 | PUT `/admin/teachers/approve/:id` with admin token | Teacher status → "approved" | ✅ Pass |
| 6 | POST `/auth/login` with teacher credentials | 200, teacher JWT received | ✅ Pass |
| 7 | Verify JWT contains correct role and department | Token decoded correctly | ✅ Pass |

### 6.4.2 End-to-End Workflow: Subject → Attendance → Report

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | POST `/subject/add` with subject data | Subject created | ✅ Pass |
| 2 | POST `/student/add` with student data | Student created | ✅ Pass |
| 3 | POST `/attendance/mark-bulk` with records | Attendance saved | ✅ Pass |
| 4 | GET `/attendance/percentage` | Percentage calculated correctly | ✅ Pass |
| 5 | GET `/attendance/dashboard` | Stats reflect new data | ✅ Pass |
| 6 | GET `/attendance/student/:rollNumber` | Student attendance returned | ✅ Pass |
| 7 | PUT `/attendance/update/:id` toggle status | Status changed | ✅ Pass |
| 8 | GET `/attendance/percentage` | Percentage recalculated | ✅ Pass |

### 6.4.3 End-to-End Workflow: ZIP Upload

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | POST `/upload/zip` with valid ZIP | Students created, photos saved | ✅ Pass |
| 2 | Verify student records in database | All fields populated correctly | ✅ Pass |
| 3 | Verify photo files in uploads/ directory | Photos saved with roll number names | ✅ Pass |
| 4 | GET `/student/all` | New students appear with photo filenames | ✅ Pass |
| 5 | Access photo via `/uploads/:filename` | Photo served correctly | ✅ Pass |

## 6.5 User Acceptance Testing

### 6.5.1 UAT Scenarios

| UAT ID | Scenario | Actor | Result |
|--------|----------|-------|--------|
| UAT-01 | Teacher registers and waits for approval | Teacher | ✅ Clear pending status message |
| UAT-02 | Admin reviews and approves registration | Admin | ✅ Smooth approval workflow |
| UAT-03 | Teacher logs in after approval | Teacher | ✅ Dashboard loads with greeting |
| UAT-04 | Teacher sets up and marks attendance via swipe | Teacher | ✅ Intuitive swipe interface |
| UAT-05 | Teacher views session summary and exports Excel | Teacher | ✅ Accurate summary and download |
| UAT-06 | Teacher edits a past attendance record | Teacher | ✅ Status toggles correctly |
| UAT-07 | Teacher views percentage report and identifies defaulters | Teacher | ✅ Defaulters highlighted |
| UAT-08 | Student logs in and views dashboard | Student | ✅ Progress circle shows correctly |
| UAT-09 | Student drills into subject-wise history | Student | ✅ Date-wise records displayed |
| UAT-10 | Student uploads profile photo | Student | ✅ Photo updates in real-time |
| UAT-11 | System accessed on mobile device | All | ✅ Responsive layout works |
| UAT-12 | 404 page displayed for invalid routes | All | ✅ Friendly 404 with home link |

## 6.6 Performance Testing

| Test | Metric | Target | Actual | Status |
|------|--------|--------|--------|--------|
| Login API response time | Latency | < 500ms | ~200ms | ✅ Pass |
| Dashboard load time | Time to interactive | < 3s | ~1.5s | ✅ Pass |
| Attendance bulk submit (30 records) | Processing time | < 2s | ~800ms | ✅ Pass |
| ZIP upload (10 students + photos) | Processing time | < 10s | ~4s | ✅ Pass |
| Page navigation (client-side) | Transition time | < 100ms | ~50ms | ✅ Pass |

## 6.7 Summary

A total of **45 unit tests**, **3 integration test workflows** (spanning 20 steps), and **12 UAT scenarios** were executed. All tests passed successfully, validating that the system meets its functional and non-functional requirements. Performance benchmarks confirmed that the system operates within acceptable response time thresholds.

---
