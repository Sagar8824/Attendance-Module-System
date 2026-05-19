
# CHAPTER 4: SYSTEM DESIGN

## 4.1 Introduction

This chapter presents the architectural design of the AttendanceIQ system, including the high-level system architecture, database schema design, API design, component hierarchy, and data flow patterns. The design decisions are explained with reference to the requirements established in Chapter 3.

## 4.2 System Architecture

### 4.2.1 High-Level Architecture

The AttendanceIQ system follows a **three-tier client-server architecture**, consisting of:

```
+-----------------------------------------------------------------+
|                    PRESENTATION TIER                             |
|                    (React Frontend)                              |
|  +-------------+ +--------------+ +--------------------------+  |
|  | Admin Panel  | |Teacher Portal| |    Student Portal         |  |
|  +-------------+ +--------------+ +--------------------------+  |
|                         | HTTP/REST (Axios)                      |
+-------------------------+---------------------------------------+
                          |
+-------------------------+---------------------------------------+
|                    APPLICATION TIER                               |
|                  (Express.js + Node.js)                          |
|  +------------+ +------------+ +------------+ +-------------+  |
|  |Admin Routes| |Auth Routes | |Attend.Route| |Student Route|  |
|  +------------+ +------------+ +------------+ +-------------+  |
|  +-----------------+ +----------------+ +------------------+   |
|  | Subject Routes   | | Upload Routes  | |Student Auth Route|   |
|  +-----------------+ +----------------+ +------------------+   |
|  +---------------------------------------------------------+    |
|  |  Middleware: CORS | JSON Parser | Static Files | JWT     |    |
|  +---------------------------------------------------------+    |
|                         | Mongoose ODM                           |
+-------------------------+---------------------------------------+
                          |
+-------------------------+---------------------------------------+
|                      DATA TIER                                   |
|                     (MongoDB)                                    |
|  +----------+ +----------+ +----------+ +----------+          |
|  |  Admin   | | Teacher  | | Student  | | Subject  |          |
|  |Collection| |Collection| |Collection| |Collection|          |
|  +----------+ +----------+ +----------+ +----------+          |
|  +--------------+  +--------------------------------------+    |
|  |  Attendance  |  |      File System (uploads/)          |    |
|  |  Collection  |  |      Student Photos Storage          |    |
|  +--------------+  +--------------------------------------+    |
+-----------------------------------------------------------------+
```

**Tier 1 — Presentation (Frontend)**: Built with React, this tier handles all user interface rendering, client-side routing, form validation, state management, and API communication. It runs entirely in the user's browser.

**Tier 2 — Application (Backend)**: The Express.js server running on Node.js processes incoming HTTP requests, implements business logic, performs authentication and authorization, handles file uploads, and communicates with the database through the Mongoose ODM.

**Tier 3 — Data (Database + File Storage)**: MongoDB stores all structured data (users, attendance records, subjects) while the local file system stores uploaded student photos in the `uploads/` directory.

### 4.2.2 Communication Protocol

The frontend and backend communicate via **RESTful HTTP APIs**. All data is exchanged in JSON format, except for file uploads which use `multipart/form-data` encoding. The Axios library is used on the frontend to make HTTP requests, while Express.js handles request routing and response generation on the backend.

## 4.3 Database Design

### 4.3.1 Database Selection Rationale

MongoDB was chosen over relational databases (e.g., MySQL, PostgreSQL) for the following reasons:

1. **Schema Flexibility**: The document model allows adding fields without migration scripts, supporting iterative development.
2. **JSON Alignment**: MongoDB's BSON format aligns naturally with the JSON data used throughout the MERN stack.
3. **Embedded Documents**: Related data can be stored together, reducing the need for complex joins.
4. **Scalability**: MongoDB supports horizontal scaling through sharding for future growth.

### 4.3.2 Collection Schemas

#### Admin Collection

```
Admin {
  _id:       ObjectId        (Auto-generated primary key)
  name:      String          (Required)
  email:     String          (Required, Unique)
  password:  String          (Required, bcrypt hashed)
  createdAt: Date            (Auto-generated timestamp)
  updatedAt: Date            (Auto-generated timestamp)
}
```

**Purpose**: Stores administrator credentials. The system supports only one admin (enforced via count check during setup). Passwords are hashed using bcrypt with 10 salt rounds before storage.

#### Teacher Collection

```
Teacher {
  _id:        ObjectId       (Auto-generated primary key)
  name:       String         (Required)
  email:      String         (Required, Unique)
  password:   String         (Required, bcrypt hashed)
  department: String         (Required - IT|CS|EC|ME|CE|EE)
  status:     String         (Enum: "pending"|"approved"|"rejected", Default: "pending")
  createdAt:  Date           (Auto-generated timestamp)
  updatedAt:  Date           (Auto-generated timestamp)
}
```

**Purpose**: Stores teacher accounts with an approval workflow. The `status` field implements a three-state lifecycle: pending → approved/rejected. Only approved teachers can authenticate.

#### Student Collection

```
Student {
  _id:        ObjectId       (Auto-generated primary key)
  name:       String         (Required)
  rollNumber: String         (Required, Unique)
  department: String         (Required)
  semester:   Number         (Required)
  password:   String         (Required, bcrypt hashed)
  photo:      String         (Nullable, filename reference)
}
```

**Purpose**: Stores student profiles. The `photo` field stores the filename of the uploaded photo (stored in the `uploads/` directory), not the binary data itself. Roll numbers serve as the unique business identifier.

#### Subject Collection

```
Subject {
  _id:        ObjectId       (Auto-generated primary key)
  name:       String         (Required - e.g., "Computer Networks")
  code:       String         (Required - e.g., "CN301")
  type:       String         (Enum: "Theory"|"Practical", Required)
  semester:   Number         (Required, 1-8)
  department: String         (Required)
  createdAt:  Date           (Auto-generated timestamp)
  updatedAt:  Date           (Auto-generated timestamp)
}

Compound Unique Index: { code, department, semester }
```

**Purpose**: Stores subject metadata with department and semester associations. The compound unique index prevents duplicate subject codes within the same department-semester combination.

#### Attendance Collection

```
Attendance {
  _id:       ObjectId        (Auto-generated primary key)
  studentId: ObjectId        (Reference → Student, Required)
  subjectId: ObjectId        (Reference → Subject, Required)
  date:      Date            (Required, normalized to midnight)
  status:    String          (Enum: "Present"|"Absent", Required)
}

Compound Unique Index: { studentId, subjectId, date }
```

**Purpose**: Stores individual attendance records linking students to subjects on specific dates. The compound unique index enforces the business rule that a student can have only one attendance record per subject per day.

### 4.3.3 Entity Relationship Diagram

```
+----------+         +--------------+         +----------+
|  Admin   |         |  Attendance  |         | Teacher  |
|----------|         |--------------|         |----------|
| name     |         | studentId ---+--------→| name     |
| email    |         | subjectId ---+--+      | email    |
| password |         | date         |  |      | password |
+----------+         | status       |  |      | department|
                     +--------------+  |      | status   |
                           |           |      +----------+
                           |           |
                     +-----+           +------+
                     v                        v
               +----------+            +----------+
               | Student  |            | Subject  |
               |----------|            |----------|
               | name     |            | name     |
               | rollNumber|           | code     |
               | department|           | type     |
               | semester  |           | semester |
               | password  |           | department|
               | photo     |           +----------+
               +----------+
```

**Relationships**:
- **Attendance → Student**: Many-to-One (many attendance records per student)
- **Attendance → Subject**: Many-to-One (many attendance records per subject)
- **Admin**: Standalone entity (no foreign key relationships)
- **Teacher**: Standalone entity (authentication only, no direct data relationships)

## 4.4 API Design

### 4.4.1 API Endpoint Summary

The backend exposes the following RESTful API endpoints grouped by route prefix:

#### Authentication Routes (`/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Teacher self-registration | No |
| POST | `/auth/login` | Teacher login | No |

#### Admin Routes (`/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/admin/setup` | One-time admin creation | No |
| POST | `/admin/login` | Admin authentication | No |
| GET | `/admin/teachers/pending` | List pending teachers | Admin JWT |
| GET | `/admin/teachers` | List teachers by status | Admin JWT |
| PUT | `/admin/teachers/approve/:id` | Approve teacher | Admin JWT |
| PUT | `/admin/teachers/reject/:id` | Reject teacher | Admin JWT |
| DELETE | `/admin/teachers/delete/:id` | Delete teacher | Admin JWT |
| PUT | `/admin/teachers/reset-password/:id` | Reset password | Admin JWT |

#### Student Routes (`/student`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/student/add` | Add single student (with photo) | No* |
| GET | `/student/all` | List students (filterable) | No* |
| POST | `/student/upload` | Bulk import via Excel | No* |
| DELETE | `/student/delete/:id` | Delete student + attendance | No* |
| DELETE | `/student/delete-all` | Delete all students + attendance | No* |
| POST | `/student/upload-photo` | Student self-upload photo | No* |

#### Student Auth Routes (`/student-auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/student-auth/login` | Student login | No |

#### Attendance Routes (`/attendance`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/attendance/mark-bulk` | Bulk mark attendance | No* |
| GET | `/attendance/all` | Get all records | No* |
| GET | `/attendance/by-date` | Filter by date/subject | No* |
| GET | `/attendance/student/:roll` | Student's attendance | No* |
| GET | `/attendance/percentage` | Percentage stats | No* |
| GET | `/attendance/dashboard` | Dashboard statistics | No* |
| PUT | `/attendance/update/:id` | Toggle attendance status | No* |

#### Subject Routes (`/subject`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/subject/add` | Add new subject | No* |
| GET | `/subject/all` | List subjects (filterable) | No* |
| DELETE | `/subject/delete/:id` | Delete subject | No* |

*Note: These routes rely on frontend-enforced authentication via protected routes rather than backend middleware verification.*

## 4.5 Frontend Component Architecture

### 4.5.1 Component Hierarchy

```
App (Router)
+-- Layout (Route Management + Navbar Logic)
|   +-- Navbar (Responsive with Hamburger Menu)
|   +-- ProtectedRoute (Role-Based Access Guard)
|   |
|   +-- [Auth Pages - No Navbar]
|   |   +-- Login (Teacher Sign In)
|   |   +-- TeacherRegister (Self-Registration)
|   |   +-- StudentLogin (Student Sign In)
|   |   +-- AdminLogin (Admin Sign In)
|   |
|   +-- [Admin Pages - No Navbar]
|   |   +-- AdminDashboard (Teacher Management)
|   |
|   +-- [Teacher Pages - With Navbar]
|   |   +-- Dashboard (Stats + Quick Actions)
|   |   +-- SwipeAttendance (Setup → Swipe → Summary)
|   |   +-- AttendanceSummary (Post-Session Report)
|   |   +-- ManageSubjects (CRUD Subjects)
|   |   +-- AttendanceHistory (View/Edit Records)
|   |   +-- AttendancePercentage (Reports + Defaulters)
|   |   +-- AddStudent (Manual Registration)
|   |   +-- UploadStudents (Excel Import)
|   |   +-- UploadZip (ZIP Import)
|   |
|   +-- [Student Pages - With Navbar]
|       +-- StudentDashboard (Overview → Subject Detail)
```

### 4.5.2 State Management

The application uses **React's built-in state management** (useState, useEffect hooks) rather than external state management libraries (e.g., Redux, Zustand). This design decision was made because:

1. The application's state is largely local to individual pages
2. Cross-page state sharing is minimal and handled via localStorage and React Router's `useLocation` state
3. The simplicity of useState/useEffect reduces bundle size and cognitive overhead

**Authentication State** is persisted in `localStorage` with the following keys:
- `token`: JWT for teacher authentication
- `role`: User role ("teacher" or "student")
- `teacher`: Serialized teacher profile object
- `department`: Teacher's department
- `student`: Serialized student profile object
- `adminToken`: JWT for admin authentication
- `admin`: Serialized admin profile object

### 4.5.3 Routing Strategy

Client-side routing is implemented using React Router DOM v7 with the following route categories:

- **Public Routes**: `/login`, `/register`, `/student-login`, `/admin-login` — accessible without authentication
- **Protected Teacher Routes**: `/`, `/swipe-attendance`, `/subjects`, `/history`, `/percentage`, `/add-student`, `/upload`, `/upload-zip` — require teacher token
- **Protected Student Routes**: `/student-dashboard` — require student session
- **Admin Routes**: `/admin-dashboard` — require admin token (frontend check)
- **Fallback Route**: `*` — 404 page with navigation back to home

The `ProtectedRoute` component acts as a route guard, checking localStorage for appropriate credentials and redirecting unauthorized users to the corresponding login page.

## 4.6 Security Design

### 4.6.1 Authentication Flow

```
[User] → Login Form → [Frontend] → POST /auth/login → [Backend]
                                                          |
                                           Validate Credentials
                                           bcrypt.compare()
                                                          |
                                           Check Teacher Status
                                           (must be "approved")
                                                          |
                                           Generate JWT Token
                                           jwt.sign({id, role, dept})
                                                          |
[User] ← Store in localStorage ← [Frontend] ← JWT Token ←+
```

### 4.6.2 Password Security

- All passwords are hashed using **bcrypt** with a cost factor of 10 before storage
- During authentication, the plaintext password is compared against the stored hash using `bcrypt.compare()`
- Password hashes are excluded from API responses using Mongoose's `.select("-password")` query projection

### 4.6.3 Token-Based Authorization

- JWT tokens encode user ID, role, and department (for teachers)
- Tokens expire after 24 hours (`expiresIn: "1d"`)
- The admin verification middleware (`verifyAdmin`) extracts the token from the Authorization header, verifies it, and checks the role claim before allowing access to admin-only endpoints

## 4.7 Design Patterns Used

| Pattern | Application |
|---------|------------|
| **MVC (Model-View-Controller)** | Models (Mongoose schemas), Views (React components), Controllers (Route handlers) |
| **Component-Based Architecture** | UI decomposed into reusable React components |
| **Middleware Pattern** | Express middleware chain for CORS, JSON parsing, JWT verification |
| **Repository Pattern** | Mongoose models abstract database operations |
| **Protected Route Pattern** | Higher-order component guards for role-based access |
| **Container/Presenter** | Pages manage state and data, sub-components handle presentation |

## 4.8 Summary

The system design follows established software engineering principles including separation of concerns, modular architecture, and security-by-design. The three-tier architecture cleanly separates presentation, business logic, and data management. The database schema efficiently models the domain with appropriate indexing and referential integrity constraints. The API design follows RESTful conventions, and the frontend component hierarchy enables maintainable, scalable UI development.

---
