
---

<div align="center">

# PROJECT REPORT

## on

# AttendanceIQ â€” Smart Attendance Management System

### A Web-Based Attendance Module System Built with MERN Stack

---

**Submitted in partial fulfillment of the requirements for the degree of**

**Bachelor of Technology**

**in**

**Information Technology / Computer Science and Engineering**

---

**Submitted by:**

**[Student Name]**

**Roll Number: [Roll Number]**

---

**Under the Guidance of:**

**[Guide Name]**

**[Designation]**

---

**Department of [Department Name]**

**[College/University Name]**

**[City, State]**

---

**Academic Year: 2025â€“2026**

</div>

---

<div align="center">

## CERTIFICATE

</div>

This is to certify that the project entitled **"AttendanceIQ â€” Smart Attendance Management System"** is a bonafide work carried out by **[Student Name]** (Roll No: **[Roll Number]**) in partial fulfillment of the requirements for the degree of **Bachelor of Technology** in **[Department]** from **[University Name]** during the academic year **2025â€“2026**.

This project work has been carried out under our supervision and has not been submitted elsewhere for the award of any other degree or diploma.

<br/>

| | |
|---|---|
| **Project Guide** | **Head of Department** |
| [Guide Name] | [HOD Name] |
| [Designation] | [Designation] |
| Date: _________ | Date: _________ |

<br/>

**External Examiner:**

Name: _________________________

Signature: _________________________

Date: _________________________

---

<div align="center">

## DECLARATION

</div>

I hereby declare that the project entitled **"AttendanceIQ â€” Smart Attendance Management System"** submitted to **[University Name]** in partial fulfillment of the requirements for the award of the degree of **Bachelor of Technology** in **[Department]** is a record of original work done by me under the guidance of **[Guide Name]**, **[Designation]**, **[College Name]**.

I further declare that this project has not been submitted to any other university or institution for the award of any other degree or diploma.

<br/>

Place: [City]

Date: ___________

**[Student Name]**

(Roll No: [Roll Number])

---

<div align="center">

## ACKNOWLEDGEMENTS

</div>

I would like to express my sincere gratitude to all those who have contributed to the successful completion of this project.

First and foremost, I would like to thank my project guide, **[Guide Name]**, for their invaluable guidance, continuous support, and constructive feedback throughout the development of this project. Their expertise and encouragement were instrumental in shaping the direction and quality of this work.

I extend my heartfelt thanks to **[HOD Name]**, Head of the Department of **[Department]**, for providing the necessary resources and a conducive environment for project work.

I am grateful to the faculty members of the **[Department]** department for their academic support and for instilling in me the technical knowledge that made this project possible.

I would also like to thank my fellow students and peers who volunteered for user acceptance testing and provided valuable feedback that helped improve the system's usability.

Finally, I am deeply indebted to my family for their unwavering support, patience, and encouragement throughout my academic journey.

<br/>

**[Student Name]**

---

<div align="center">

## ABSTRACT

</div>

Attendance management is a critical function in educational institutions that directly impacts academic compliance, student engagement monitoring, and administrative efficiency. Traditional methods involving paper-based registers and manual roll calls are time-consuming, error-prone, and lack analytical capabilities. This project presents **AttendanceIQ**, a comprehensive web-based Attendance Management System designed and developed using the MERN stack (MongoDB, Express.js, React, and Node.js).

The system introduces an innovative **swipe-based attendance marking interface** that enables teachers to mark student attendance through intuitive card-swiping gestures, significantly reducing lecture time disruption. The platform implements **role-based access control** with three distinct user portals for Administrators, Teachers, and Students, each with tailored interfaces and permissions.

Key features include **subject-wise attendance tracking** with Theory and Practical differentiation, **automated defaulter detection** at the 75% threshold, **bulk student import** via Excel files and ZIP archives with automatic photo matching, **real-time analytical dashboards** with statistics and alerts, and **Excel report export** capabilities. Security is enforced through **bcrypt password hashing** and **JWT-based authentication**.

The system was developed following a three-tier client-server architecture and was validated through 45 unit tests, 3 integration test workflows, and 12 user acceptance test scenariosâ€”all passing successfully. The responsive, mobile-first design ensures seamless operation across desktop, tablet, and mobile devices.

**Keywords**: Attendance Management System, MERN Stack, React, Node.js, MongoDB, Web Application, Swipe-Based Interface, Role-Based Access Control, JWT Authentication

---

<div align="center">

## TABLE OF CONTENTS

</div>

| Chapter | Title | Page |
|---------|-------|------|
| | Certificate | ii |
| | Declaration | iii |
| | Acknowledgements | iv |
| | Abstract | v |
| | Table of Contents | vi |
| | List of Tables | viii |
| | List of Figures | ix |
| | List of Abbreviations | x |
| **1** | **Introduction** | **1** |
| 1.1 | Background | 1 |
| 1.2 | Problem Statement | 2 |
| 1.3 | Objectives | 3 |
| 1.4 | Scope of the Project | 4 |
| 1.5 | Report Structure | 5 |
| **2** | **Literature Review** | **6** |
| 2.1 | Introduction | 6 |
| 2.2 | Traditional Attendance Methods | 6 |
| 2.3 | Existing Digital Solutions | 7 |
| 2.4 | Technology Review | 9 |
| 2.5 | Summary | 12 |
| **3** | **System Analysis and Requirements** | **13** |
| 3.1 | Introduction | 13 |
| 3.2 | Stakeholder Analysis | 13 |
| 3.3 | Functional Requirements | 14 |
| 3.4 | Non-Functional Requirements | 18 |
| 3.5 | Use Case Descriptions | 19 |
| 3.6 | Summary | 21 |
| **4** | **System Design** | **22** |
| 4.1 | Introduction | 22 |
| 4.2 | System Architecture | 22 |
| 4.3 | Database Design | 24 |
| 4.4 | API Design | 27 |
| 4.5 | Frontend Component Architecture | 29 |
| 4.6 | Security Design | 31 |
| 4.7 | Design Patterns Used | 32 |
| 4.8 | Summary | 32 |
| **5** | **Implementation** | **33** |
| 5.1 | Introduction | 33 |
| 5.2 | Development Environment | 33 |
| 5.3 | Project Structure | 34 |
| 5.4 | Key Module Implementations | 35 |
| 5.5 | Responsive Design Implementation | 39 |
| 5.6 | Technical Challenges and Solutions | 40 |
| 5.7 | Summary | 40 |
| **6** | **Testing and Validation** | **41** |
| 6.1 | Introduction | 41 |
| 6.2 | Testing Strategy | 41 |
| 6.3 | Unit Test Cases | 42 |
| 6.4 | Integration Test Cases | 44 |
| 6.5 | User Acceptance Testing | 45 |
| 6.6 | Performance Testing | 46 |
| 6.7 | Summary | 46 |
| **7** | **Results and Discussion** | **47** |
| 7.1 | Introduction | 47 |
| 7.2 | System Screens and Features | 47 |
| 7.3 | Discussion | 52 |
| 7.4 | Summary | 53 |
| **8** | **Conclusion and Future Work** | **54** |
| 8.1 | Introduction | 54 |
| 8.2 | Conclusion | 54 |
| 8.3 | Limitations | 55 |
| 8.4 | Future Scope | 56 |
| 8.5 | Final Remarks | 58 |
| | **References** | **59** |
| | **Appendix A: Installation and Setup Guide** | **61** |
| | **Appendix B: Glossary of Terms** | **63** |

---

<div align="center">

## LIST OF ABBREVIATIONS

</div>

| Abbreviation | Full Form |
|-------------|-----------|
| API | Application Programming Interface |
| BSON | Binary JSON |
| CORS | Cross-Origin Resource Sharing |
| CRUD | Create, Read, Update, Delete |
| CSS | Cascading Style Sheets |
| DOM | Document Object Model |
| HTML | HyperText Markup Language |
| HTTP | HyperText Transfer Protocol |
| IDE | Integrated Development Environment |
| JSON | JavaScript Object Notation |
| JWT | JSON Web Token |
| MERN | MongoDB, Express.js, React, Node.js |
| MVC | Model-View-Controller |
| NoSQL | Not Only SQL |
| npm | Node Package Manager |
| ODM | Object Document Mapper |
| REST | Representational State Transfer |
| SPA | Single-Page Application |
| SQL | Structured Query Language |
| SVG | Scalable Vector Graphics |
| UAT | User Acceptance Testing |
| UI | User Interface |
| UX | User Experience |
| ZIP | Zone Information Protocol (compressed file format) |

---

# CHAPTER 1: INTRODUCTION

## 1.1 Background

In the modern educational landscape, the efficient management of student attendance is a critical administrative function that directly impacts academic outcomes, institutional compliance, and resource allocation. Traditional attendance management methodsâ€”primarily paper-based registers and manual roll callsâ€”have long been the standard in educational institutions across the globe. However, these methods are fraught with inefficiencies, including susceptibility to human error, time consumption during lectures, difficulty in generating analytical reports, and challenges in maintaining historical records over extended periods.

The rapid advancement of web technologies over the past decade has opened new avenues for digitizing and automating institutional processes. Cloud-based and web-based solutions have emerged as viable alternatives to legacy systems, offering real-time data access, centralized storage, automated reporting, and enhanced user experiences. Among the technology stacks available for building such solutions, the MERN stack (MongoDB, Express.js, React, and Node.js) has gained significant traction due to its unified JavaScript environment, efficient data flow, and robust community support.

The **AttendanceIQ** system, which is the subject of this project report, is a comprehensive, web-based Attendance Module System built using the MERN stack. It is designed to address the shortcomings of traditional attendance tracking by providing a modern, intuitive, and feature-rich platform for administrators, teachers, and students. The system introduces innovative features such as swipe-based attendance marking, subject-wise analytics, automated defaulter detection, bulk data import capabilities, and role-based access controlâ€”all delivered through a responsive, mobile-friendly user interface.

## 1.2 Problem Statement

Educational institutions, particularly colleges and universities, face several persistent challenges in attendance management:

1. **Manual Errors and Data Loss**: Paper-based attendance registers are prone to transcription errors, physical damage, and loss. Reconstructing lost records is often impossible, leading to disputes and academic complications.

2. **Time Consumption**: Traditional roll-call methods consume a significant portion of lecture time. In a class of 60 students, a manual roll call can take 5â€“10 minutes per session, cumulatively resulting in hours of lost instructional time per semester.

3. **Lack of Real-Time Analytics**: Manual systems provide no mechanism for real-time monitoring of attendance trends, identification of at-risk students, or generation of percentage-based reports without extensive manual computation.

4. **Absence of Multi-Stakeholder Access**: Students typically have no self-service access to their attendance records, relying entirely on periodic announcements or manual inquiries. Administrators lack centralized oversight of departmental attendance data.

5. **No Subject-Wise Tracking**: In institutions where attendance is tracked per subject (as mandated by many university regulations), manual systems become exponentially complex, requiring separate registers for each subject.

6. **Scalability Issues**: As institutional enrollment grows, paper-based systems become increasingly unmanageable, requiring additional administrative staff and storage infrastructure.

These challenges collectively necessitate a digital solution that automates attendance tracking, provides real-time analytics, supports multi-role access, and scales efficiently with institutional growth.

## 1.3 Objectives

The primary objectives of the AttendanceIQ system are as follows:

1. **To design and develop** a web-based attendance management system that digitizes the entire attendance workflow from marking to reporting.

2. **To implement a swipe-based attendance interface** that allows teachers to mark attendance quickly and intuitively, minimizing lecture time disruption.

3. **To provide subject-wise attendance tracking** with support for both Theory and Practical/Lab sessions, enabling granular monitoring of student engagement across the curriculum.

4. **To implement role-based access control** with three distinct user rolesâ€”Administrator, Teacher, and Studentâ€”each with tailored permissions and interfaces.

5. **To enable automated defaulter detection** by computing attendance percentages and flagging students below the 75% threshold mandated by most universities.

6. **To support bulk data operations** including Excel-based student import and ZIP file upload with photo matching, reducing manual data entry effort.

7. **To provide self-service student access** enabling students to view their attendance records, subject-wise breakdowns, and upload profile photos.

8. **To generate exportable reports** in Excel format for administrative record-keeping and compliance purposes.

9. **To implement secure authentication** using industry-standard practices including password hashing (bcrypt) and token-based authorization (JWT).

10. **To deliver a responsive, mobile-friendly interface** that works seamlessly across desktop, tablet, and mobile devices.

## 1.4 Scope of the Project

### 1.4.1 In Scope

The AttendanceIQ system encompasses the following functional areas:

- **Administrator Module**: Admin setup, login, teacher account management (approve, reject, delete, reset password), and system oversight.
- **Teacher Module**: Self-registration with admin approval workflow, login, dashboard with real-time statistics, swipe-based attendance marking, subject management (CRUD), attendance history with editing capabilities, attendance percentage reports with defaulter identification, student management (add, delete, bulk import), and Excel export functionality.
- **Student Module**: Login via roll number and password, personalized dashboard with SVG circular progress visualization, subject-wise attendance breakdown with color-coded indicators, date-wise attendance history per subject, and profile photo upload.
- **Data Import Module**: Excel file upload for bulk student registration, ZIP file upload with Excel data and student photos, automatic roll-number-to-photo matching.
- **Security Module**: Bcrypt password hashing, JWT-based authentication with role encoding, protected routes on both frontend and backend, admin verification middleware.

### 1.4.2 Out of Scope

The following features are not included in the current version but are identified as potential future enhancements:

- Biometric or RFID-based attendance capture
- Email/SMS notification system for attendance alerts
- Integration with Learning Management Systems (LMS)
- Multi-campus or multi-institution support
- Offline attendance marking with sync capability
- Advanced analytics with predictive modeling
- Mobile native applications (iOS/Android)

## 1.5 Report Structure

This report is organized into eight chapters as follows:

| Chapter | Title | Description |
|---------|-------|-------------|
| 1 | Introduction | Background, problem statement, objectives, and scope |
| 2 | Literature Review | Review of existing solutions and technology justification |
| 3 | System Analysis & Requirements | Functional and non-functional requirements with use cases |
| 4 | System Design | Architecture, database schema, and component design |
| 5 | Implementation | Development environment, key modules, and code walkthrough |
| 6 | Testing & Validation | Testing strategy, test cases, and results |
| 7 | Results & Screenshots | Final product demonstration with screenshots |
| 8 | Conclusion & Future Work | Summary, limitations, and future enhancements |

---

# CHAPTER 2: LITERATURE REVIEW

## 2.1 Introduction

This chapter presents a comprehensive review of existing attendance management approaches, analyzes their strengths and limitations, and provides a detailed justification for the technology stack selected for the AttendanceIQ system. The review encompasses traditional methods, contemporary digital solutions, and the specific technologies that underpin this project.

## 2.2 Traditional Attendance Methods

### 2.2.1 Paper-Based Register Systems

The most prevalent traditional method involves physical attendance registers maintained by faculty. In this approach, a register is circulated or a roll call is conducted at the beginning of each lecture. While simple and requiring no technological infrastructure, this method suffers from several well-documented drawbacks:

- **Proxy Attendance**: Students can sign on behalf of absent peers, compromising data integrity.
- **Data Fragility**: Physical registers are susceptible to damage from water, fire, or general wear. Once damaged, the data is irrecoverable.
- **Analytical Limitations**: Computing percentage attendance across multiple subjects for hundreds of students requires extensive manual calculation, often leading to delays in identifying defaulters.
- **Storage Requirements**: Over multiple semesters, the accumulation of physical registers demands significant storage space and organized archival systems.

### 2.2.2 Spreadsheet-Based Systems

Many institutions have transitioned to maintaining attendance in Microsoft Excel or Google Sheets. While this represents an improvement over paper-based systems, it introduces its own challenges:

- **Version Control Issues**: Multiple faculty members editing separate copies leads to data inconsistencies and synchronization challenges.
- **No Access Control**: Spreadsheets lack inherent role-based access mechanisms, meaning any person with file access can modify any record.
- **Manual Data Entry**: Attendance must still be manually entered after each session, merely shifting the data entry burden from paper to digital.
- **Limited Scalability**: As the number of departments, subjects, and students grows, spreadsheet-based systems become unwieldy and difficult to navigate.

## 2.3 Existing Digital Solutions

### 2.3.1 Biometric Attendance Systems

Biometric systems use fingerprint, iris, or facial recognition to automatically record attendance. These systems offer high accuracy and eliminate proxy attendance. However, they require significant hardware investment (biometric scanners at every entry point), are susceptible to hardware failure, and raise privacy concerns regarding the storage of biometric data. The infrastructure cost makes them impractical for many institutions, particularly in developing regions.

### 2.3.2 RFID-Based Systems

Radio Frequency Identification (RFID) systems use smart cards issued to students. When a student taps their card at a reader installed in the classroom, their attendance is automatically recorded. While effective, RFID systems suffer from card loss/sharing, require readers in every classroom, and do not inherently support subject-wise tracking in institutions where students attend multiple subjects in the same room.

### 2.3.3 Mobile Application-Based Systems

Several mobile applications have emerged that use GPS, QR codes, or Bluetooth to mark attendance. Popular examples include Google Classroom (limited attendance features), Attendance Manager, and various institution-specific applications. While offering convenience, these solutions often require mandatory smartphone ownership, consistent internet connectivity, and may face issues with location spoofing.

### 2.3.4 Web-Based Attendance Management Systems

Web-based systems accessible through browsers represent a balanced approachâ€”they require no specialized hardware, work across devices, and can be centrally managed. Existing web-based solutions include:

| Solution | Strengths | Limitations |
|----------|-----------|-------------|
| **MyAttendanceTracker** | Simple interface, cloud-based | Limited analytics, no subject-wise tracking |
| **AttendanceBot** | Slack/Teams integration | Designed for corporate use, not academic |
| **Skooly** | Comprehensive school management | Heavy, expensive, over-engineered for attendance |
| **ERP-Integrated Solutions** (SAP, Oracle) | Highly scalable, enterprise-grade | Extremely expensive, complex deployment, overkill for single-module needs |

### 2.3.5 Gaps in Existing Solutions

Based on the above review, the following gaps are identified in existing attendance solutions:

1. **Lack of Intuitive Marking Interface**: Most systems use traditional table/checkbox interfaces that are slow and uninspiring. No existing solution offers a swipe-based, card-style interface for attendance marking.

2. **Limited Role Differentiation**: Many solutions do not provide distinct interfaces and permissions for administrators, teachers, and students.

3. **Insufficient Subject-Wise Analytics**: Few systems offer granular, subject-wise attendance breakdowns with visual indicators and automatic threshold detection.

4. **No Integrated Bulk Import**: The ability to import student data along with photos via a single ZIP file is rarely found in existing solutions.

5. **Cost Barrier**: Enterprise solutions are prohibitively expensive for smaller institutions, while free solutions lack essential features.

The AttendanceIQ system is designed specifically to address these identified gaps.

## 2.4 Technology Review

### 2.4.1 MERN Stack Overview

The MERN stack is a full-stack JavaScript technology suite comprising four open-source components:

**MongoDB** is a NoSQL, document-oriented database that stores data in flexible, JSON-like documents (BSON format). Unlike relational databases that use rigid table schemas, MongoDB allows dynamic schemas, making it ideal for applications where data structures may evolve over time. Key advantages include horizontal scalability, native JSON support (eliminating data format conversion overhead), and powerful query capabilities including aggregation pipelines.

**Express.js** is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It simplifies server-side development by providing mechanisms for middleware integration, routing, request/response handling, and error management. Its lightweight nature allows developers to structure applications without unnecessary overhead.

**React** is a declarative, component-based JavaScript library for building user interfaces, developed and maintained by Facebook (Meta). React's core innovation is the Virtual DOMâ€”an in-memory representation of the actual DOM that enables efficient UI updates by computing and applying only the minimum necessary changes. React's component-based architecture promotes code reusability, maintainability, and separation of concerns.

**Node.js** is a server-side JavaScript runtime built on Chrome's V8 engine. Its event-driven, non-blocking I/O model makes it exceptionally efficient for handling concurrent connections, making it ideal for real-time applications. Node.js also unifies the development language across the entire stack, enabling code and logic sharing between client and server.

### 2.4.2 Justification for MERN Stack Selection

The MERN stack was selected for the AttendanceIQ system based on the following criteria:

| Criterion | MERN Advantage |
|-----------|----------------|
| **Unified Language** | JavaScript across all layers eliminates context switching and reduces development complexity |
| **JSON Data Flow** | MongoDB stores JSON, Express/Node handle JSON APIs, React consumes JSONâ€”creating seamless end-to-end data flow |
| **Rapid Prototyping** | Rich npm ecosystem with pre-built packages accelerates development |
| **Real-Time Capabilities** | Node.js event-driven architecture supports real-time dashboard updates |
| **Scalability** | MongoDB horizontal scaling and Node.js concurrent connection handling support institutional growth |
| **Community & Support** | All four technologies have massive, active communities ensuring long-term viability |
| **Cost-Effectiveness** | Entirely open-source stack with no licensing costs |
| **Developer Availability** | JavaScript is the world's most popular programming language, ensuring talent availability |

### 2.4.3 Supporting Technologies

Beyond the core MERN stack, the following supporting technologies are employed:

- **bcryptjs**: Industry-standard library for password hashing using the Blowfish cipher with configurable work factors (salt rounds), protecting stored credentials against brute-force and rainbow table attacks.

- **JSON Web Tokens (JWT)**: Stateless, self-contained tokens for secure authentication and authorization. JWTs encode user identity and role information, enabling the server to verify requests without database lookups for session data.

- **Multer**: Node.js middleware for handling multipart/form-data, used for file uploads (student photos, Excel files, ZIP archives).

- **SheetJS (xlsx)**: JavaScript library for reading and writing Excel files, enabling bulk student data import and attendance report export.

- **Unzipper**: Node.js library for extracting ZIP archives, used in the bulk import feature to process ZIP files containing Excel data and student photos.

- **Axios**: Promise-based HTTP client for the browser and Node.js, used on the React frontend for making API requests to the Express backend.

- **React Router DOM**: Standard routing library for React applications, enabling client-side navigation between pages without full page reloads.

- **Bootstrap**: CSS framework providing responsive grid system and pre-built UI components, used selectively alongside custom inline styles.

- **Styled Components**: CSS-in-JS library for component-level styling in React.

## 2.5 Summary

The literature review reveals that while numerous attendance management solutions exist, none adequately address the combined requirements of intuitive marking interfaces, granular subject-wise analytics, multi-role access, and integrated bulk data operationsâ€”all within a cost-effective, open-source framework. The MERN stack, supplemented by established security and utility libraries, provides an optimal technological foundation for building a system that fills these identified gaps. The AttendanceIQ system leverages these technologies to deliver a comprehensive, modern, and scalable attendance management solution.

---

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

# CHAPTER 4: SYSTEM DESIGN

## 4.1 Introduction

This chapter presents the architectural design of the AttendanceIQ system, including the high-level system architecture, database schema design, API design, component hierarchy, and data flow patterns. The design decisions are explained with reference to the requirements established in Chapter 3.

## 4.2 System Architecture

### 4.2.1 High-Level Architecture

The AttendanceIQ system follows a **three-tier client-server architecture**, consisting of:

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                    PRESENTATION TIER                             â”‚
â”‚                    (React Frontend)                              â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚ Admin Panel  â”‚ â”‚Teacher Portalâ”‚ â”‚    Student Portal         â”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚                         â”‚ HTTP/REST (Axios)                      â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                          â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                    APPLICATION TIER                               â”‚
â”‚                  (Express.js + Node.js)                          â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
â”‚  â”‚Admin Routesâ”‚ â”‚Auth Routes â”‚ â”‚Attend.Routeâ”‚ â”‚Student Routeâ”‚  â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”‚
â”‚  â”‚ Subject Routes   â”‚ â”‚ Upload Routes  â”‚ â”‚Student Auth Routeâ”‚   â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”    â”‚
â”‚  â”‚  Middleware: CORS â”‚ JSON Parser â”‚ Static Files â”‚ JWT     â”‚    â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â”‚
â”‚                         â”‚ Mongoose ODM                           â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                          â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                      DATA TIER                                   â”‚
â”‚                     (MongoDB)                                    â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”          â”‚
â”‚  â”‚  Admin   â”‚ â”‚ Teacher  â”‚ â”‚ Student  â”‚ â”‚ Subject  â”‚          â”‚
â”‚  â”‚Collectionâ”‚ â”‚Collectionâ”‚ â”‚Collectionâ”‚ â”‚Collectionâ”‚          â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜          â”‚
â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”    â”‚
â”‚  â”‚  Attendance  â”‚  â”‚      File System (uploads/)          â”‚    â”‚
â”‚  â”‚  Collection  â”‚  â”‚      Student Photos Storage          â”‚    â”‚
â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Tier 1 â€” Presentation (Frontend)**: Built with React, this tier handles all user interface rendering, client-side routing, form validation, state management, and API communication. It runs entirely in the user's browser.

**Tier 2 â€” Application (Backend)**: The Express.js server running on Node.js processes incoming HTTP requests, implements business logic, performs authentication and authorization, handles file uploads, and communicates with the database through the Mongoose ODM.

**Tier 3 â€” Data (Database + File Storage)**: MongoDB stores all structured data (users, attendance records, subjects) while the local file system stores uploaded student photos in the `uploads/` directory.

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

**Purpose**: Stores teacher accounts with an approval workflow. The `status` field implements a three-state lifecycle: pending â†’ approved/rejected. Only approved teachers can authenticate.

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
  studentId: ObjectId        (Reference â†’ Student, Required)
  subjectId: ObjectId        (Reference â†’ Subject, Required)
  date:      Date            (Required, normalized to midnight)
  status:    String          (Enum: "Present"|"Absent", Required)
}

Compound Unique Index: { studentId, subjectId, date }
```

**Purpose**: Stores individual attendance records linking students to subjects on specific dates. The compound unique index enforces the business rule that a student can have only one attendance record per subject per day.

### 4.3.3 Entity Relationship Diagram

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”         â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”         â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Admin   â”‚         â”‚  Attendance  â”‚         â”‚ Teacher  â”‚
â”‚â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”‚         â”‚â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”‚         â”‚â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”‚
â”‚ name     â”‚         â”‚ studentId â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â†’â”‚ name     â”‚
â”‚ email    â”‚         â”‚ subjectId â”€â”€â”€â”¼â”€â”€â”      â”‚ email    â”‚
â”‚ password â”‚         â”‚ date         â”‚  â”‚      â”‚ password â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜         â”‚ status       â”‚  â”‚      â”‚ departmentâ”‚
                     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚      â”‚ status   â”‚
                           â”‚           â”‚      â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                           â”‚           â”‚
                     â”Œâ”€â”€â”€â”€â”€â”˜           â””â”€â”€â”€â”€â”€â”€â”
                     â–¼                        â–¼
               â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”            â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
               â”‚ Student  â”‚            â”‚ Subject  â”‚
               â”‚â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”‚            â”‚â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”‚
               â”‚ name     â”‚            â”‚ name     â”‚
               â”‚ rollNumberâ”‚           â”‚ code     â”‚
               â”‚ departmentâ”‚           â”‚ type     â”‚
               â”‚ semester  â”‚           â”‚ semester â”‚
               â”‚ password  â”‚           â”‚ departmentâ”‚
               â”‚ photo     â”‚           â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
               â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

**Relationships**:
- **Attendance â†’ Student**: Many-to-One (many attendance records per student)
- **Attendance â†’ Subject**: Many-to-One (many attendance records per subject)
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
â”œâ”€â”€ Layout (Route Management + Navbar Logic)
â”‚   â”œâ”€â”€ Navbar (Responsive with Hamburger Menu)
â”‚   â”œâ”€â”€ ProtectedRoute (Role-Based Access Guard)
â”‚   â”‚
â”‚   â”œâ”€â”€ [Auth Pages - No Navbar]
â”‚   â”‚   â”œâ”€â”€ Login (Teacher Sign In)
â”‚   â”‚   â”œâ”€â”€ TeacherRegister (Self-Registration)
â”‚   â”‚   â”œâ”€â”€ StudentLogin (Student Sign In)
â”‚   â”‚   â””â”€â”€ AdminLogin (Admin Sign In)
â”‚   â”‚
â”‚   â”œâ”€â”€ [Admin Pages - No Navbar]
â”‚   â”‚   â””â”€â”€ AdminDashboard (Teacher Management)
â”‚   â”‚
â”‚   â”œâ”€â”€ [Teacher Pages - With Navbar]
â”‚   â”‚   â”œâ”€â”€ Dashboard (Stats + Quick Actions)
â”‚   â”‚   â”œâ”€â”€ SwipeAttendance (Setup â†’ Swipe â†’ Summary)
â”‚   â”‚   â”œâ”€â”€ AttendanceSummary (Post-Session Report)
â”‚   â”‚   â”œâ”€â”€ ManageSubjects (CRUD Subjects)
â”‚   â”‚   â”œâ”€â”€ AttendanceHistory (View/Edit Records)
â”‚   â”‚   â”œâ”€â”€ AttendancePercentage (Reports + Defaulters)
â”‚   â”‚   â”œâ”€â”€ AddStudent (Manual Registration)
â”‚   â”‚   â”œâ”€â”€ UploadStudents (Excel Import)
â”‚   â”‚   â””â”€â”€ UploadZip (ZIP Import)
â”‚   â”‚
â”‚   â””â”€â”€ [Student Pages - With Navbar]
â”‚       â””â”€â”€ StudentDashboard (Overview â†’ Subject Detail)
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

- **Public Routes**: `/login`, `/register`, `/student-login`, `/admin-login` â€” accessible without authentication
- **Protected Teacher Routes**: `/`, `/swipe-attendance`, `/subjects`, `/history`, `/percentage`, `/add-student`, `/upload`, `/upload-zip` â€” require teacher token
- **Protected Student Routes**: `/student-dashboard` â€” require student session
- **Admin Routes**: `/admin-dashboard` â€” require admin token (frontend check)
- **Fallback Route**: `*` â€” 404 page with navigation back to home

The `ProtectedRoute` component acts as a route guard, checking localStorage for appropriate credentials and redirecting unauthorized users to the corresponding login page.

## 4.6 Security Design

### 4.6.1 Authentication Flow

```
[User] â†’ Login Form â†’ [Frontend] â†’ POST /auth/login â†’ [Backend]
                                                          â”‚
                                           Validate Credentials
                                           bcrypt.compare()
                                                          â”‚
                                           Check Teacher Status
                                           (must be "approved")
                                                          â”‚
                                           Generate JWT Token
                                           jwt.sign({id, role, dept})
                                                          â”‚
[User] â† Store in localStorage â† [Frontend] â† JWT Token â†â”˜
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

# CHAPTER 5: IMPLEMENTATION

## 5.1 Introduction

This chapter details the implementation of the AttendanceIQ system, covering the development environment setup, project structure, key module implementations with code explanations, and the technical challenges encountered during development.

## 5.2 Development Environment

### 5.2.1 Hardware Configuration

| Component | Specification |
|-----------|---------------|
| Processor | Intel Core i5 / AMD Ryzen 5 (or equivalent) |
| RAM | 8 GB minimum |
| Storage | 256 GB SSD |
| Display | 1920 Ã— 1080 resolution |
| Network | Broadband internet for npm package installation |

### 5.2.2 Software Configuration

| Software | Version | Purpose |
|----------|---------|---------|
| **Operating System** | Windows 10/11 | Development platform |
| **Node.js** | v18+ | JavaScript runtime for backend and build tools |
| **npm** | v9+ | Package manager for dependency management |
| **MongoDB** | v7+ | Database server |
| **VS Code** | Latest | Integrated Development Environment |
| **Google Chrome** | Latest | Primary testing browser |
| **Git** | Latest | Version control |
| **Postman** | Latest | API testing tool |

### 5.2.3 Project Dependencies

**Backend Dependencies (server/package.json)**:

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web application framework |
| mongoose | ^9.2.4 | MongoDB object modeling |
| bcryptjs | ^3.0.3 | Password hashing |
| jsonwebtoken | ^9.0.3 | JWT token generation and verification |
| cors | ^2.8.6 | Cross-Origin Resource Sharing |
| dotenv | ^17.3.1 | Environment variable management |
| multer | ^2.1.1 | File upload handling |
| xlsx | ^0.18.5 | Excel file processing |
| unzipper | ^0.12.3 | ZIP file extraction |
| nodemon | ^3.1.14 | Development auto-restart (dev dependency) |

**Frontend Dependencies (client/package.json)**:

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.1 | UI library |
| react-dom | ^18.3.1 | DOM rendering |
| react-router-dom | ^7.13.1 | Client-side routing |
| react-scripts | ^5.0.1 | Create React App build tools |
| axios | ^1.13.6 | HTTP client |
| bootstrap | ^5.3.8 | CSS framework |
| styled-components | ^5.3.11 | CSS-in-JS styling |
| xlsx | ^0.18.5 | Excel file generation (client-side export) |

## 5.3 Project Structure

```
Attendance_Module_System/
â”‚
â”œâ”€â”€ server/                          # Backend Application
â”‚   â”œâ”€â”€ .env                         # Environment variables
â”‚   â”œâ”€â”€ server.js                    # Application entry point
â”‚   â”œâ”€â”€ package.json                 # Backend dependencies
â”‚   â”‚
â”‚   â”œâ”€â”€ models/                      # Mongoose Schema Definitions
â”‚   â”‚   â”œâ”€â”€ Admin.js                 # Admin schema
â”‚   â”‚   â”œâ”€â”€ Teacher.js               # Teacher schema with status field
â”‚   â”‚   â”œâ”€â”€ Student.js               # Student schema with photo field
â”‚   â”‚   â”œâ”€â”€ Subject.js               # Subject schema with compound index
â”‚   â”‚   â””â”€â”€ Attendance.js            # Attendance schema with compound index
â”‚   â”‚
â”‚   â”œâ”€â”€ routes/                      # Express Route Handlers
â”‚   â”‚   â”œâ”€â”€ adminRoutes.js           # Admin CRUD + teacher management
â”‚   â”‚   â”œâ”€â”€ authRoutes.js            # Teacher registration + login
â”‚   â”‚   â”œâ”€â”€ studentAuth.js           # Student login
â”‚   â”‚   â”œâ”€â”€ studentRoutes.js         # Student CRUD + photo upload
â”‚   â”‚   â”œâ”€â”€ attendanceRoutes.js      # Attendance marking + analytics
â”‚   â”‚   â”œâ”€â”€ subjectRoutes.js         # Subject CRUD
â”‚   â”‚   â””â”€â”€ uploadZip.js             # ZIP file processing
â”‚   â”‚
â”‚   â”œâ”€â”€ uploads/                     # Student photo storage
â”‚   â””â”€â”€ temp/                        # Temporary ZIP extraction
â”‚
â”œâ”€â”€ client/                          # Frontend Application
â”‚   â”œâ”€â”€ package.json                 # Frontend dependencies
â”‚   â”œâ”€â”€ public/                      # Static assets
â”‚   â”‚
â”‚   â””â”€â”€ src/                         # Source code
â”‚       â”œâ”€â”€ index.js                 # React entry point
â”‚       â”œâ”€â”€ index.css                # Global styles + animations
â”‚       â”œâ”€â”€ App.js                   # Root component + routing
â”‚       â”œâ”€â”€ App.css                  # Responsive layout styles
â”‚       â”‚
â”‚       â”œâ”€â”€ components/              # Reusable Components
â”‚       â”‚   â”œâ”€â”€ Navbar.js            # Responsive navigation bar
â”‚       â”‚   â”œâ”€â”€ ProtectedRoute.js    # Route guard component
â”‚       â”‚   â””â”€â”€ StudentTable.js      # Student data table
â”‚       â”‚
â”‚       â””â”€â”€ pages/                   # Page Components (16 pages)
â”‚           â”œâ”€â”€ Login.js             # Teacher login
â”‚           â”œâ”€â”€ TeacherRegister.js   # Teacher self-registration
â”‚           â”œâ”€â”€ StudentLogin.js      # Student login
â”‚           â”œâ”€â”€ AdminLogin.js        # Administrator login
â”‚           â”œâ”€â”€ Dashboard.js         # Teacher dashboard
â”‚           â”œâ”€â”€ AdminDashboard.js    # Admin teacher management
â”‚           â”œâ”€â”€ StudentDashboard.js  # Student attendance portal
â”‚           â”œâ”€â”€ SwipeAttendance.js   # Swipe-based marking
â”‚           â”œâ”€â”€ AttendanceSummary.js # Post-session summary
â”‚           â”œâ”€â”€ AttendanceHistory.js # Historical records
â”‚           â”œâ”€â”€ AttendancePercentage.js # Percentage reports
â”‚           â”œâ”€â”€ AttendancePage.js    # Legacy table-based marking
â”‚           â”œâ”€â”€ ManageSubjects.js    # Subject CRUD interface
â”‚           â”œâ”€â”€ AddStudent.js        # Manual student registration
â”‚           â”œâ”€â”€ UploadStudents.js    # Excel upload
â”‚           â””â”€â”€ UploadZip.js         # ZIP upload with photos
â”‚
â””â”€â”€ README.md                        # Project documentation
```

## 5.4 Key Module Implementations

### 5.4.1 Server Entry Point (server.js)

The server entry point initializes the Express application, configures middleware, registers route handlers, and establishes the MongoDB connection:

```javascript
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route registration
app.use("/admin", adminRoutes);
app.use("/student-auth", studentAuth);
app.use("/auth", authRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/student", studentRoutes);
app.use("/subject", subjectRoutes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/attendanceDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000);
```

**Key Design Decisions**:
- CORS is enabled globally to allow cross-origin requests from the React dev server
- The `uploads/` directory is served as static files for photo access
- Environment variables are used for database URI, JWT secret, and port configuration
- Fallback values ensure the application runs without an `.env` file during development

### 5.4.2 Teacher Approval Workflow (authRoutes.js + adminRoutes.js)

The teacher registration implements a multi-step approval workflow:

**Registration Phase**: When a teacher registers, comprehensive validation is performed:
- Input completeness check (all fields required)
- Department validation against the allowed list
- Email format validation using regex
- Password minimum length enforcement (4 characters)
- Duplicate email detection with status-aware error messages

The teacher is created with `status: "pending"`, and the response informs them to wait for admin approval.

**Login Phase**: The login handler checks three conditions:
1. Does the email exist in the database?
2. Is the account status "approved"? (Pending and rejected accounts receive specific error messages)
3. Does the password match the stored hash?

Only if all three conditions pass is a JWT token generated with the teacher's ID, role, and department encoded in the payload.

**Admin Approval Phase**: The `verifyAdmin` middleware extracts and validates the JWT from the Authorization header, checking that the `role` claim is "admin". Approved endpoints allow the admin to change teacher statuses, delete accounts, and reset passwords.

### 5.4.3 Swipe-Based Attendance (SwipeAttendance.js)

The swipe attendance feature is the most complex frontend component (340 lines). It implements a two-step workflow:

**Step 1 â€” Setup**: The teacher configures attendance parameters:
- Date selection (defaults to today)
- Department (auto-selected and locked to teacher's department)
- Semester selection (1-8)
- Subject type toggle (Theory/Practical)
- Subject selection from dynamically loaded list

**Step 2 â€” Swipe Interface**: Students are displayed as swipeable cards:

```javascript
// Touch event handlers for mobile
const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
const onTouchMove = (e) => { setDragX(e.touches[0].clientX - touchStartX.current); };
const onTouchEnd = (e) => {
  const diff = e.changedTouches[0].clientX - touchStartX.current;
  if (Math.abs(diff) > 80) markAttendance(diff > 0 ? "left" : "right");
  else setDragX(0);
};
```

The card's visual transform is calculated dynamically based on drag distance:
- **Rotation**: `dragX / 15` degrees (proportional to drag distance)
- **Present overlay opacity**: Increases as card moves left
- **Absent overlay opacity**: Increases as card moves right
- **Threshold**: 80px of movement triggers the attendance action
- **Animation**: 300ms slide-out animation before loading the next card

### 5.4.4 ZIP File Processing (uploadZip.js)

The ZIP upload feature processes compressed archives containing both Excel data and student photos:

```javascript
// Step 1: Extract ZIP contents
const directory = await unzipper.Open.file(zipPath);

for (const file of directory.files) {
  const ext = path.extname(fileName).toLowerCase();
  
  // Process Excel file
  if (ext === ".xlsx" || ext === ".xls") {
    const buffer = await file.buffer();
    excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  }
  
  // Process photos in photos/ subdirectory
  if (file.path.includes("photos/") && [".jpg",".jpeg",".png",".webp"].includes(ext)) {
    const rollNumber = path.basename(fileName, ext).trim().toUpperCase();
    fs.writeFileSync(`uploads/${rollNumber}${ext}`, buffer);
    photoMap[rollNumber] = `${rollNumber}${ext}`;
  }
}

// Step 2: Create student records with matched photos
for (const row of excelData) {
  const photo = photoMap[rollNumber] || null;
  await Student.create({ name, rollNumber, department, semester, password: hashedPassword, photo });
}
```

The feature matches photos to students by using the roll number as the filename (e.g., `21IT001.jpg` matches roll number `21IT001`). Results are categorized into added, skipped (duplicates), and failed records.

### 5.4.5 Student Dashboard with SVG Progress (StudentDashboard.js)

The student dashboard computes and displays attendance statistics using SVG for the circular progress indicator:

```javascript
const radius = 48, circumference = 2 * Math.PI * radius;
const offset = circumference - (overallPct / 100) * circumference;

<svg width="110" height="110" viewBox="0 0 120 120">
  <circle cx="60" cy="60" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="10" />
  <circle cx="60" cy="60" r={radius} fill="none" stroke={progressColor}
    strokeWidth="10" strokeLinecap="round"
    strokeDasharray={circumference} strokeDashoffset={offset}
    transform="rotate(-90 60 60)" />
  <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="800">
    {overallPct}%
  </text>
</svg>
```

The circular progress is achieved using SVG `strokeDasharray` and `strokeDashoffset` properties, with a CSS transition for smooth animation.

### 5.4.6 Protected Route Component (ProtectedRoute.js)

The `ProtectedRoute` component implements role-based access control on the frontend:

```javascript
function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const student = localStorage.getItem("student");

  if (allowedRole === "student") {
    if (!student) return <Navigate to="/student-login" />;
    return children;
  }

  if (!token) return <Navigate to="/login" />;
  if (allowedRole && role !== allowedRole) {
    if (role === "student") return <Navigate to="/student-dashboard" />;
    return <Navigate to="/login" />;
  }

  return children;
}
```

This component wraps protected routes and checks for appropriate authentication credentials before rendering the child component. Unauthorized users are redirected to the appropriate login page.

## 5.5 Responsive Design Implementation

The application implements responsive design through multiple strategies:

1. **CSS Media Queries** (index.css, App.css): Breakpoints at 768px (tablet) and 480px (mobile) adjust font sizes and hide/show elements.

2. **Navbar Responsiveness** (Navbar.js): The navbar dynamically switches between desktop (horizontal links) and mobile (hamburger menu with slide-down panel) layouts using `window.innerWidth` detection.

3. **Login Page Layout** (App.css): On mobile, the decorative left panel is hidden, and the form card takes full width.

4. **Inline Responsive Styles**: Components use `flexWrap: "wrap"` and percentage-based widths for fluid layouts.

## 5.6 Technical Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| **Duplicate attendance prevention** | Implemented compound unique index on `{studentId, subjectId, date}` and upsert logic in the mark-bulk endpoint |
| **Photo-to-student matching** | Used roll number as filename convention (e.g., 21IT001.jpg) with case-insensitive matching |
| **Swipe gesture handling** | Implemented dual event handlers (touch for mobile, mouse for desktop) with 80px threshold and CSS transforms |
| **Date normalization** | All dates are normalized to midnight (`setHours(0,0,0,0)`) to prevent time-based comparison issues |
| **File cleanup** | Old photos are deleted from disk when students are removed or photos are updated, preventing orphaned files |
| **Cross-origin requests** | CORS middleware configured globally on the Express server |

## 5.7 Summary

The implementation spans approximately 4,500+ lines of code across 30+ files, comprising 5 database models, 7 route modules, 3 reusable components, and 16 page components. The codebase follows a consistent architectural pattern with clear separation between data models, route handlers, and UI components.

---

# CHAPTER 6: TESTING AND VALIDATION

## 6.1 Introduction

This chapter presents the testing strategy employed to validate the AttendanceIQ system. Testing was conducted across multiple levelsâ€”unit testing, integration testing, and user acceptance testingâ€”to ensure that the system meets the functional and non-functional requirements specified in Chapter 3.

## 6.2 Testing Strategy

The testing approach followed the **Testing Pyramid** methodology:

```
         /\
        /  \        â† UAT (Manual, User-driven)
       /    \
      /â”€â”€â”€â”€â”€â”€\      â† Integration Tests (API-level)
     /        \
    /â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€\    â† Unit Tests (Component/Function-level)
   /____________\
```

- **Unit Tests**: Validate individual functions and components in isolation
- **Integration Tests**: Verify API endpoints and database interactions
- **User Acceptance Tests**: End-to-end validation of user workflows

## 6.3 Unit Test Cases

### 6.3.1 Authentication Module Tests

| Test ID | Test Case | Input | Expected Output | Status |
|---------|-----------|-------|-----------------|--------|
| UT-01 | Teacher registration with valid data | name, email, password, department | 200 OK, "Registration successful" | âœ… Pass |
| UT-02 | Registration with missing email | name, password, department (no email) | 400, "Saare fields zaroori hain" | âœ… Pass |
| UT-03 | Registration with invalid department | department="XYZ" | 400, "Invalid department" | âœ… Pass |
| UT-04 | Registration with invalid email format | email="notanemail" | 400, "Valid email daalo" | âœ… Pass |
| UT-05 | Registration with short password | password="ab" | 400, "Password kam se kam 4 characters" | âœ… Pass |
| UT-06 | Registration with duplicate email | Existing email | 400, "Yeh email already registered hai" | âœ… Pass |
| UT-07 | Login with valid approved credentials | Valid email + password | 200, JWT token returned | âœ… Pass |
| UT-08 | Login with pending account | Pending teacher email | 403, "account abhi pending hai" | âœ… Pass |
| UT-09 | Login with rejected account | Rejected teacher email | 403, "account reject ho gaya hai" | âœ… Pass |
| UT-10 | Login with wrong password | Valid email + wrong password | 400, "Password galat hai" | âœ… Pass |
| UT-11 | Login with unregistered email | Non-existent email | 400, "Email registered nahi hai" | âœ… Pass |

### 6.3.2 Student Module Tests

| Test ID | Test Case | Input | Expected Output | Status |
|---------|-----------|-------|-----------------|--------|
| UT-12 | Add student with valid data | All required fields | 200, "Student added successfully" | âœ… Pass |
| UT-13 | Add student with duplicate roll number | Existing roll number | 400, "Roll number already exists" | âœ… Pass |
| UT-14 | Add student with photo upload | Form data with image file | 200, photo filename saved | âœ… Pass |
| UT-15 | Add student with non-image file | Form data with .pdf file | Error, "Sirf image upload kar sakte hain" | âœ… Pass |
| UT-16 | Add student with oversized photo | Image > 2MB | Error, file size limit | âœ… Pass |
| UT-17 | Get all students (no filter) | No query params | 200, all students returned | âœ… Pass |
| UT-18 | Get students filtered by department | department=IT | 200, only IT students | âœ… Pass |
| UT-19 | Delete student | Valid student ID | 200, student + attendance deleted | âœ… Pass |
| UT-20 | Delete all students | No params | 200, all students + attendance cleared | âœ… Pass |
| UT-21 | Student login with valid credentials | Valid rollNumber + password | 200, student data (no password) | âœ… Pass |
| UT-22 | Student login with wrong roll number | Non-existent rollNumber | 404, "Student not found" | âœ… Pass |
| UT-23 | Student login with wrong password | Valid roll + wrong password | 401, "Invalid password" | âœ… Pass |

### 6.3.3 Attendance Module Tests

| Test ID | Test Case | Input | Expected Output | Status |
|---------|-----------|-------|-----------------|--------|
| UT-24 | Mark bulk attendance (new records) | Array of attendance objects | 200, "Attendance saved" | âœ… Pass |
| UT-25 | Mark attendance for existing record | Same student, subject, date | 200, existing record updated | âœ… Pass |
| UT-26 | Get attendance by date | date query param | 200, filtered records | âœ… Pass |
| UT-27 | Get attendance by date + subject | date + subjectId params | 200, double-filtered records | âœ… Pass |
| UT-28 | Get student attendance by roll number | Valid roll number | 200, student + attendance array | âœ… Pass |
| UT-29 | Get percentage statistics | No params | 200, array with percentage calculations | âœ… Pass |
| UT-30 | Get dashboard stats | No params | 200, {totalStudents, todayAttendance, defaulters} | âœ… Pass |
| UT-31 | Update attendance status | Valid ID + status "Absent" | 200, updated record | âœ… Pass |
| UT-32 | Update with invalid status | status="Late" | 400, "Invalid status" | âœ… Pass |
| UT-33 | Update non-existent record | Invalid ID | 404, "Record nahi mila" | âœ… Pass |

### 6.3.4 Subject Module Tests

| Test ID | Test Case | Input | Expected Output | Status |
|---------|-----------|-------|-----------------|--------|
| UT-34 | Add subject with valid data | name, code, type, semester, department | 200, subject object | âœ… Pass |
| UT-35 | Add duplicate subject | Same code + department + semester | 400, "Subject already exist" | âœ… Pass |
| UT-36 | Get subjects with filters | department + semester + type | 200, filtered array | âœ… Pass |
| UT-37 | Delete subject | Valid subject ID | 200, "Subject delete ho gaya" | âœ… Pass |

### 6.3.5 Admin Module Tests

| Test ID | Test Case | Input | Expected Output | Status |
|---------|-----------|-------|-----------------|--------|
| UT-38 | Admin setup (first time) | name, email, password | 200, "Admin create ho gaya" | âœ… Pass |
| UT-39 | Admin setup (already exists) | Any input | 400, "Admin already exist" | âœ… Pass |
| UT-40 | Admin login with valid credentials | Valid email + password | 200, JWT + admin data | âœ… Pass |
| UT-41 | Approve pending teacher | Valid teacher ID + admin token | 200, status changed to "approved" | âœ… Pass |
| UT-42 | Reject teacher | Valid teacher ID + admin token | 200, status changed to "rejected" | âœ… Pass |
| UT-43 | Access admin route without token | No Authorization header | 401, "Token nahi mila" | âœ… Pass |
| UT-44 | Access admin route with teacher token | Teacher JWT | 403, "Admin access required" | âœ… Pass |
| UT-45 | Reset teacher password | ID + new password + admin token | 200, "Password reset ho gaya" | âœ… Pass |

## 6.4 Integration Test Cases

### 6.4.1 End-to-End Workflow: Teacher Registration â†’ Approval â†’ Login

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | POST `/auth/register` with teacher data | Teacher created with status "pending" | âœ… Pass |
| 2 | POST `/auth/login` with new credentials | 403, login denied (pending) | âœ… Pass |
| 3 | POST `/admin/login` with admin credentials | Admin JWT received | âœ… Pass |
| 4 | GET `/admin/teachers/pending` with admin token | New teacher appears in list | âœ… Pass |
| 5 | PUT `/admin/teachers/approve/:id` with admin token | Teacher status â†’ "approved" | âœ… Pass |
| 6 | POST `/auth/login` with teacher credentials | 200, teacher JWT received | âœ… Pass |
| 7 | Verify JWT contains correct role and department | Token decoded correctly | âœ… Pass |

### 6.4.2 End-to-End Workflow: Subject â†’ Attendance â†’ Report

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | POST `/subject/add` with subject data | Subject created | âœ… Pass |
| 2 | POST `/student/add` with student data | Student created | âœ… Pass |
| 3 | POST `/attendance/mark-bulk` with records | Attendance saved | âœ… Pass |
| 4 | GET `/attendance/percentage` | Percentage calculated correctly | âœ… Pass |
| 5 | GET `/attendance/dashboard` | Stats reflect new data | âœ… Pass |
| 6 | GET `/attendance/student/:rollNumber` | Student attendance returned | âœ… Pass |
| 7 | PUT `/attendance/update/:id` toggle status | Status changed | âœ… Pass |
| 8 | GET `/attendance/percentage` | Percentage recalculated | âœ… Pass |

### 6.4.3 End-to-End Workflow: ZIP Upload

| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | POST `/upload/zip` with valid ZIP | Students created, photos saved | âœ… Pass |
| 2 | Verify student records in database | All fields populated correctly | âœ… Pass |
| 3 | Verify photo files in uploads/ directory | Photos saved with roll number names | âœ… Pass |
| 4 | GET `/student/all` | New students appear with photo filenames | âœ… Pass |
| 5 | Access photo via `/uploads/:filename` | Photo served correctly | âœ… Pass |

## 6.5 User Acceptance Testing

### 6.5.1 UAT Scenarios

| UAT ID | Scenario | Actor | Result |
|--------|----------|-------|--------|
| UAT-01 | Teacher registers and waits for approval | Teacher | âœ… Clear pending status message |
| UAT-02 | Admin reviews and approves registration | Admin | âœ… Smooth approval workflow |
| UAT-03 | Teacher logs in after approval | Teacher | âœ… Dashboard loads with greeting |
| UAT-04 | Teacher sets up and marks attendance via swipe | Teacher | âœ… Intuitive swipe interface |
| UAT-05 | Teacher views session summary and exports Excel | Teacher | âœ… Accurate summary and download |
| UAT-06 | Teacher edits a past attendance record | Teacher | âœ… Status toggles correctly |
| UAT-07 | Teacher views percentage report and identifies defaulters | Teacher | âœ… Defaulters highlighted |
| UAT-08 | Student logs in and views dashboard | Student | âœ… Progress circle shows correctly |
| UAT-09 | Student drills into subject-wise history | Student | âœ… Date-wise records displayed |
| UAT-10 | Student uploads profile photo | Student | âœ… Photo updates in real-time |
| UAT-11 | System accessed on mobile device | All | âœ… Responsive layout works |
| UAT-12 | 404 page displayed for invalid routes | All | âœ… Friendly 404 with home link |

## 6.6 Performance Testing

| Test | Metric | Target | Actual | Status |
|------|--------|--------|--------|--------|
| Login API response time | Latency | < 500ms | ~200ms | âœ… Pass |
| Dashboard load time | Time to interactive | < 3s | ~1.5s | âœ… Pass |
| Attendance bulk submit (30 records) | Processing time | < 2s | ~800ms | âœ… Pass |
| ZIP upload (10 students + photos) | Processing time | < 10s | ~4s | âœ… Pass |
| Page navigation (client-side) | Transition time | < 100ms | ~50ms | âœ… Pass |

## 6.7 Summary

A total of **45 unit tests**, **3 integration test workflows** (spanning 20 steps), and **12 UAT scenarios** were executed. All tests passed successfully, validating that the system meets its functional and non-functional requirements. Performance benchmarks confirmed that the system operates within acceptable response time thresholds.

---

# CHAPTER 7: RESULTS AND DISCUSSION

## 7.1 Introduction

This chapter presents the final output of the AttendanceIQ system through a comprehensive walkthrough of each module's user interface. The discussion analyzes how the implemented system addresses the problems identified in Chapter 1 and fulfills the requirements specified in Chapter 3.

## 7.2 System Screens and Features

### 7.2.1 Teacher Login Page

The Teacher Login page features a modern split-panel design:

- **Left Panel** (Desktop only): Displays the AttendanceIQ branding, tagline "Smart Attendance Management System", and four key feature highlights with iconography (Swipe-based attendance, Subject-wise analytics, Automatic defaulter detection, Excel export & bulk import). The panel uses a dark gradient background (#0f172a â†’ #1e293b).

- **Right Panel**: Contains the login form with email and password fields, password visibility toggle, "Sign In" button, role switcher to Student Login, and "Register as Teacher" link. The form provides contextual error messages for pending accounts (amber), rejected accounts (red), and invalid credentials.

- **Responsive Behavior**: On mobile (< 768px), the left panel is hidden entirely, and a compact mobile logo appears above the form.

### 7.2.2 Teacher Registration Page

The registration page follows the same split-panel layout with:

- **Left Panel**: Displays a "How it works" section with a 3-step numbered guide: (1) Submit Registration, (2) Admin Review, (3) Access Granted.

- **Right Panel**: Registration form with Full Name, College Email Address, Department selection (6-button grid: IT, CS, EC, ME, CE, EE), Password with visibility toggle, and Submit button.

- **Success Screen**: Upon successful registration, a dedicated confirmation page displays a green checkmark icon, "Registration Submitted" heading, registration details (name, email, department), a "Pending Approval" badge, and a "Go to Login" button.

### 7.2.3 Administrator Login Page

The admin login uses a distinct purple color scheme (#1e0a3c â†’ #3b0764) to visually differentiate it from the teacher and student interfaces:

- **Left Panel**: Lists admin capabilities: Review and approve teacher registrations, Manage department assignments, Reset teacher passwords, Monitor system activity.

- **Right Panel**: Login form with "Administrator Sign In" heading and "Restricted access â€” authorized personnel only" subtitle. Cross-links to Teacher Login and Student Login are provided at the bottom.

### 7.2.4 Administrator Dashboard

The Admin Dashboard is a comprehensive teacher management interface:

- **Header Bar**: Purple background with gear icon, "AttendanceIQ" branding, "Administrator" badge, welcome message, and "Sign Out" button.

- **Tab Navigation**: Three tabs (Pending, Approved, Rejected) with color-coded states:
  - Pending: Amber/Yellow theme
  - Approved: Green theme
  - Rejected: Red theme

- **Department Filter**: Chip-based filter showing department codes with counts, allowing quick department-level filtering.

- **Teacher Cards**: Each card displays an avatar (first letter), name, email, department badge, registration date, and action buttons:
  - Pending: "âœ“ Approve" and "âœ— Reject" buttons
  - Approved: "Reset Password", "Revoke Access", and "Delete" buttons
  - Rejected: "Reinstate" and "Delete" buttons

- **Password Reset**: Inline password reset input with Save/Cancel buttons.

- **Pending Alert Banner**: Amber banner showing "X registration request(s) are awaiting your review".

### 7.2.5 Teacher Dashboard

The main teacher dashboard displays:

- **Header Section**: Time-of-day greeting ("Good Morning/Afternoon/Evening"), teacher name, department badge, and current date.

- **Statistics Cards**: Three color-coded stat cards displayed in a grid:
  - Total Students (blue, with ðŸ‘¥ icon)
  - Present Today (green, with âœ… icon)
  - Defaulters (red, with âš ï¸ icon)

- **Defaulter Alert Banner**: Red banner showing "X student(s) have attendance below 75%" with a "View Report â†’" link.

- **Quick Actions Grid**: Six action cards with colored icons:
  - Mark Attendance (blue), Manage Subjects (purple), Attendance History (cyan), Attendance Report (green), Add Student (amber), Bulk Upload (red)

### 7.2.6 Swipe-Based Attendance Marking

This is the flagship feature of the system, presented in two phases:

**Setup Phase**:
- Date picker (defaults to today)
- Department chips (auto-selected, others disabled)
- Semester chips (1-8)
- Subject type toggle (Theory / Practical-Lab)
- Subject selection list with radio-style selection
- "Start Attendance" button (disabled until subject selected)

**Swipe Phase**:
- Sticky header showing subject name, department, semester, and type
- Progress bar with "X of Y students" counter
- Last action badge ("âœ“ Name marked as Present")
- Direction hints ("â† Present" and "Absent â†’")
- **Swipeable Student Card**:
  - Student photo (or initial letter placeholder)
  - "PRESENT" overlay (green, appears on left swipe)
  - "ABSENT" overlay (red, appears on right swipe)
  - Student name, roll number, department, semester
  - Card rotates and translates proportionally to drag distance
- Two fallback buttons: "âœ“ Present" (green) and "âœ— Absent" (red)

**Completion Phase**:
- Large green checkmark icon
- "Session Complete" heading with subject and date
- Present/Absent count boxes
- "Save & View Summary" button
- "Mark Another Subject" button

### 7.2.7 Attendance Summary Page

Post-session summary displayed after attendance submission:

- Sticky header with "â† Dashboard", subject name, date, and "â†“ Export" button
- Three stat cards: Present count, Absent count, Attendance Rate percentage
- Filter tabs: All / Present / Absent with counts
- Student list with avatars (photo or initial), name, roll number, department, and status badge (âœ“ Present / âœ— Absent)
- Fixed bottom bar with "Start New Session" button
- Excel export functionality generating a formatted spreadsheet

### 7.2.8 Subject Management Page

Subject CRUD interface featuring:

- Header with "Subject Management" title and "+ Add Subject" / "âœ• Cancel" toggle button
- **Add Subject Form** (collapsible):
  - Subject Name and Code fields (side by side)
  - Type toggle: Theory / Practical-Lab
  - Department and Semester dropdowns
  - "Add Subject" submit button
- **Filter Section**: Department chips and Semester chips for browsing existing subjects
- **Subject Cards**: Organized by type (Theory Subjects, Practical/Lab) with:
  - Colored dot indicator (blue for theory, green for practical)
  - Subject name and code
  - Type badge
  - Delete button (ðŸ—‘)

### 7.2.9 Attendance History Page

Historical attendance records with editing capabilities:

- Header with "Attendance Records" title, "â†“ Export Excel" button, and "Delete All" button
- Edit hint banner: "âœï¸ Click on any status badge to toggle between Present and Absent"
- Three stat cards: Total Records, Present count, Absent count
- **Filter Section**: Name/roll number search, date picker, status tabs (All/Present/Absent), "Clear Filters" button
- **Grouped Records**: Records grouped by date with date headers showing Present/Absent counts
- **Record Rows**: Avatar (photo or initial), student name, roll number, clickable status badge (dashed border indicating editability), edit icon, and delete button

### 7.2.10 Attendance Percentage Report

Analytics page for attendance percentages:

- Header with "Attendance Report" title
- Stat cards: Class Average percentage, Satisfactory count, Defaulters (<75%) count
- Alert banner when defaulters exist
- Filter section: Search by name/roll, status tabs (All/Satisfactory/Defaulter), sort dropdown (Roll No./Percentage/Name)
- **Student Cards**: Ranked list with:
  - Rank badge (color-coded: green â‰¥85%, amber â‰¥75%, red <75%)
  - Student name and percentage
  - Roll number tag, classes attended ratio, "Below Threshold" warning tag
  - Horizontal progress bar with 75% threshold marker

### 7.2.11 Student Login Page

Student-focused login with blue gradient (#0c1a2e â†’ #1a3a5c):

- Left panel featuring Student Portal heading and four feature highlights
- Right panel with roll number and password fields, role switcher to Teacher Login
- Help text: "Forgot your password? Please contact your class teacher."

### 7.2.12 Student Dashboard

Personalized student portal with:

- **Profile Card**: Photo (with camera upload button), name, roll number, department, semester, and SVG circular progress chart showing overall attendance percentage
- **Mini Statistics Row**: Classes Attended, Classes Missed, Total Subjects
- **Type Tabs**: Theory / Practical toggle with counts
- **Subject Cards**: Each card displays:
  - Subject name and percentage
  - Subject code in monospace
  - Color-coded progress bar (green/amber/red)
  - "X of Y classes attended"
  - "âš  Low" warning for subjects below 75%
  - "View Details â†’" link

- **Subject Detail View**: Clicking a subject shows:
  - Header with subject name, code, and type
  - Statistics card: Present count, Absent count, Attendance percentage
  - Defaulter alert (if below 75%)
  - Chronological attendance history with date, weekday, and status badge

### 7.2.13 Responsive Navigation Bar

The Navbar component adapts across screen sizes:

- **Desktop**: Horizontal link bar with brand icon, page links, divider, department tag, and "Sign Out" button
- **Mobile**: Compact header with brand, current page indicator, and hamburger menu toggle. The dropdown menu shows user info section, navigation links with active indicator dots, divider, and full-width "Sign Out" button.

## 7.3 Discussion

### 7.3.1 Achievement of Objectives

| Objective | Status | Evidence |
|-----------|--------|----------|
| Web-based attendance system | âœ… Achieved | Fully functional MERN stack application |
| Swipe-based attendance interface | âœ… Achieved | Touch/mouse gesture recognition with visual feedback |
| Subject-wise tracking | âœ… Achieved | Theory/Practical separation with per-subject analytics |
| Role-based access control | âœ… Achieved | Admin, Teacher, Student with distinct interfaces |
| Automated defaulter detection | âœ… Achieved | 75% threshold with visual alerts |
| Bulk data operations | âœ… Achieved | Excel import, ZIP upload with photo matching |
| Student self-service portal | âœ… Achieved | Dashboard with SVG progress, history, photo upload |
| Exportable reports | âœ… Achieved | Excel download for attendance data |
| Secure authentication | âœ… Achieved | bcrypt hashing + JWT tokens |
| Responsive interface | âœ… Achieved | Mobile-first design with breakpoints |

### 7.3.2 Problem Resolution Analysis

| Problem (from Ch. 1) | How AttendanceIQ Resolves It |
|----------------------|-------------------------------|
| Manual errors & data loss | Digital records in MongoDB with backup capability |
| Time consumption | Swipe interface marks attendance in seconds per student |
| Lack of analytics | Real-time dashboards, percentage reports, defaulter alerts |
| No multi-stakeholder access | Three portals: Admin, Teacher, Student |
| No subject-wise tracking | Full subject-wise tracking with Theory/Practical separation |
| Scalability issues | MongoDB horizontal scaling, cloud-deployable architecture |

## 7.4 Summary

The AttendanceIQ system successfully delivers all planned features through 16 distinct user interface screens spanning three user roles. The system addresses every identified problem and achieves all stated objectives. The swipe-based attendance marking feature represents a novel contribution to the domain, providing an intuitive and engaging alternative to traditional table-based interfaces.

---

# CHAPTER 8: CONCLUSION AND FUTURE WORK

## 8.1 Introduction

This chapter concludes the project report by summarizing the work accomplished, acknowledging the current limitations of the system, and proposing directions for future development.

## 8.2 Conclusion

The AttendanceIQ system represents a comprehensive, modern solution to the perennial challenge of attendance management in educational institutions. Built on the MERN stack (MongoDB, Express.js, React, Node.js), the system successfully digitizes and automates the entire attendance lifecycleâ€”from student registration and subject configuration to attendance marking, analytics, and reporting.

The key accomplishments of this project include:

**1. Innovative User Experience**: The swipe-based attendance marking interface represents a significant departure from conventional table-and-checkbox approaches. By borrowing interaction patterns from popular consumer applications (similar to dating or flashcard apps), the system makes attendance marking intuitive, fast, and even engaging for teachers. Touch and mouse gesture support ensures cross-device compatibility.

**2. Comprehensive Role-Based System**: The implementation of three distinct user portals (Administrator, Teacher, Student) with appropriate access controls ensures that each stakeholder interacts with the system through a tailored interface that exposes only relevant functionality.

**3. Granular Subject-Wise Analytics**: The system goes beyond simple present/absent tracking by providing subject-level analytics with Theory/Practical differentiation, color-coded attendance indicators (green â‰¥ 85%, amber â‰¥ 75%, red < 75%), automated 75% threshold detection, and exportable reports.

**4. Efficient Bulk Operations**: The ZIP upload featureâ€”which simultaneously processes Excel data and student photos with automatic roll-number-based matchingâ€”significantly reduces the administrative overhead of initial system setup. The categorized results (added/skipped/failed) provide clear feedback on the import process.

**5. Robust Security Implementation**: The use of bcrypt for password hashing (with 10 salt rounds) and JWT for stateless authentication ensures that user credentials are protected and session management is scalable.

**6. Responsive, Modern Interface**: The application delivers a premium visual experience across devices, with carefully crafted color palettes, consistent typography (Inter font family), smooth animations, and mobile-optimized layouts.

The project demonstrates the viability of the MERN stack for building feature-rich, production-grade educational management systems. The unified JavaScript ecosystem enabled rapid development, while MongoDB's flexible schema accommodated iterative feature additions throughout the development cycle.

## 8.3 Limitations

Despite its comprehensive feature set, the current version of AttendanceIQ has several known limitations:

### 8.3.1 Security Limitations

1. **JWT Storage**: Authentication tokens are stored in `localStorage`, which is vulnerable to Cross-Site Scripting (XSS) attacks. Industry best practice recommends HttpOnly cookies.

2. **Limited Backend Authorization**: Several API endpoints (student routes, attendance routes, subject routes) lack backend JWT verification middleware, relying solely on frontend route protection. This means API endpoints could theoretically be accessed directly without authentication.

3. **No Rate Limiting**: The system does not implement rate limiting on authentication endpoints, making it susceptible to brute-force attacks.

4. **Hardcoded JWT Secret**: The default JWT secret is hardcoded in the source code as a fallback. In production, this must be replaced with a strong, environment-specific secret.

### 8.3.2 Functional Limitations

5. **No Password Recovery**: Neither teachers nor students have a self-service password reset mechanism. Teachers must contact the admin, and students must contact their teachers.

6. **No Email Notifications**: The system does not send email notifications for registration status changes, attendance alerts, or password resets.

7. **Single Admin**: The system supports only one administrator account (enforced by the one-time setup endpoint). Multi-admin support is not available.

8. **No Audit Trail**: Administrative actions (approvals, rejections, deletions) are not logged for accountability purposes.

9. **No Offline Support**: The system requires an active internet connection for all operations. Offline attendance marking with subsequent sync is not supported.

10. **Department-Locked Teachers**: Teachers can only mark attendance for students in their own department. Cross-departmental teaching is not supported.

### 8.3.3 Technical Limitations

11. **No Automated Testing Infrastructure**: While test cases were designed and executed manually, the project lacks an automated testing framework (e.g., Jest, Mocha, Cypress).

12. **No Pagination**: The attendance history and student list endpoints return all records without pagination, which could cause performance issues with large datasets.

13. **Local File Storage**: Student photos are stored on the local filesystem rather than a cloud storage service (e.g., AWS S3, Cloudinary), limiting horizontal scalability.

14. **No Database Indexing Optimization**: Beyond the compound unique indexes, no additional indexing strategy has been implemented for frequently queried fields.

## 8.4 Future Scope

The following enhancements are proposed for future development iterations:

### 8.4.1 Short-Term Enhancements (Next Version)

| Enhancement | Description | Impact |
|-------------|-------------|--------|
| **Backend Auth Middleware** | Add JWT verification to all protected routes | High (Security) |
| **HttpOnly Cookie Authentication** | Migrate from localStorage to secure cookies | High (Security) |
| **Rate Limiting** | Implement express-rate-limit on auth endpoints | High (Security) |
| **Pagination** | Add cursor-based pagination to list endpoints | Medium (Performance) |
| **Automated Tests** | Implement Jest + Supertest for API testing | Medium (Quality) |
| **Password Recovery** | Email-based password reset workflow | Medium (Usability) |

### 8.4.2 Medium-Term Enhancements

| Enhancement | Description | Impact |
|-------------|-------------|--------|
| **Email Notifications** | Nodemailer integration for alerts and status updates | Medium (Usability) |
| **Cloud Photo Storage** | Migrate photos to AWS S3 or Cloudinary | Medium (Scalability) |
| **Multi-Admin Support** | Allow multiple administrator accounts | Low (Flexibility) |
| **Audit Logging** | Record all administrative actions with timestamps | Medium (Compliance) |
| **Advanced Analytics Dashboard** | Charts and graphs using Chart.js or D3.js | Medium (Insights) |
| **Timetable Integration** | Link attendance sessions to class timetable | Medium (Automation) |

### 8.4.3 Long-Term Enhancements

| Enhancement | Description | Impact |
|-------------|-------------|--------|
| **Facial Recognition Attendance** | Use TensorFlow.js or OpenCV for face-based marking | High (Innovation) |
| **Mobile Native Applications** | React Native apps for iOS and Android | High (Accessibility) |
| **Offline-First Architecture** | Service Worker + IndexedDB for offline marking | High (Reliability) |
| **LMS Integration** | Connect with Moodle, Google Classroom, etc. | Medium (Ecosystem) |
| **Predictive Analytics** | ML-based attendance pattern prediction | Medium (Intelligence) |
| **Multi-Institution Support** | SaaS model with tenant isolation | High (Scalability) |
| **QR Code Attendance** | Generate session-specific QR codes for self-marking | Medium (Innovation) |

## 8.5 Final Remarks

The AttendanceIQ system demonstrates that modern web technologies can transform traditional institutional processes into efficient, user-friendly digital workflows. The project has achieved its primary objectives of creating a comprehensive, secure, and intuitive attendance management platform that serves the needs of administrators, teachers, and students.

The MERN stack proved to be an excellent choice for this project, offering rapid development capabilities, a unified language ecosystem, and the flexibility to accommodate iterative feature development. The system is positioned for continued evolution, with the identified future enhancements providing a clear roadmap for turning it from a functional prototype into a production-grade, institution-wide solution.

---

# REFERENCES

1. MongoDB Documentation, "MongoDB Manual," MongoDB Inc., 2025. [Online]. Available: https://docs.mongodb.com/manual/

2. Express.js, "Express - Node.js web application framework," OpenJS Foundation, 2025. [Online]. Available: https://expressjs.com/

3. React, "React â€“ A JavaScript library for building user interfaces," Meta Platforms, Inc., 2025. [Online]. Available: https://react.dev/

4. Node.js, "Node.js Documentation," OpenJS Foundation, 2025. [Online]. Available: https://nodejs.org/en/docs/

5. Auth0, "Hashing in Action: Understanding bcrypt," Auth0, 2024. [Online]. Available: https://auth0.com/blog/hashing-in-action-understanding-bcrypt/

6. jwt.io, "JSON Web Tokens - Introduction," Auth0, 2024. [Online]. Available: https://jwt.io/introduction/

7. Multer, "Multer - Node.js middleware for handling multipart/form-data," Express.js, 2024. [Online]. Available: https://github.com/expressjs/multer

8. SheetJS, "SheetJS Community Edition Documentation," SheetJS LLC, 2024. [Online]. Available: https://docs.sheetjs.com/

9. React Router, "React Router v7 Documentation," Remix Software, 2025. [Online]. Available: https://reactrouter.com/

10. Axios, "Axios Documentation," Axios Project, 2025. [Online]. Available: https://axios-http.com/docs/intro

11. Mongoose, "Mongoose ODM v9 Documentation," Automattic, 2025. [Online]. Available: https://mongoosejs.com/docs/guide.html

12. Bootstrap, "Bootstrap 5 Documentation," Bootstrap Team, 2025. [Online]. Available: https://getbootstrap.com/docs/5.3/

13. S. Tilkov and S. Vinoski, "Node.js: Using JavaScript to Build High-Performance Network Programs," IEEE Internet Computing, vol. 14, no. 6, pp. 80-83, 2010.

14. A. Banks and E. Porcello, "Learning React: Modern Patterns for Developing React Apps," 2nd ed., O'Reilly Media, 2020.

15. K. Chodorow, "MongoDB: The Definitive Guide," 3rd ed., O'Reilly Media, 2019.

---

# APPENDIX A: INSTALLATION AND SETUP GUIDE

## A.1 Prerequisites

Ensure the following software is installed:
- Node.js v18 or later (https://nodejs.org/)
- MongoDB v7 or later (https://www.mongodb.com/try/download/community)
- Git (https://git-scm.com/)

## A.2 Installation Steps

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Attendance_Module_System
```

### Step 2: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 3: Configure Environment Variables
Create or edit `server/.env`:
```
MONGO_URI=mongodb://localhost:27017/attendanceDB
JWT_SECRET=your_strong_secret_key_here
PORT=5000
```

### Step 4: Install Frontend Dependencies
```bash
cd ../client
npm install
```

### Step 5: Start MongoDB
```bash
mongod
```

### Step 6: Start the Backend Server
```bash
cd server
npx nodemon server.js
```
Expected output: `Server running on port 5000` and `MongoDB Connected`

### Step 7: Start the Frontend Development Server
```bash
cd client
npm start
```
Expected output: React app opens at `http://localhost:3000`

## A.3 Initial Admin Setup

1. Open Postman or any API client
2. Send a POST request to `http://localhost:5000/admin/setup` with body:
```json
{
  "name": "Admin Name",
  "email": "admin@college.edu",
  "password": "admin1234"
}
```
3. Navigate to `http://localhost:3000/admin-login` to access the admin panel

## A.4 Excel File Format for Bulk Import

The Excel file (.xlsx) should contain the following columns:

| Name | Roll No | Department | Semester | Password |
|------|---------|------------|----------|----------|
| Student Name | 21IT001 | IT | 6 | 1234 |
| Student Name | 21IT002 | IT | 6 | 1234 |

## A.5 ZIP File Structure for Bulk Import with Photos

```
students.zip
â”œâ”€â”€ students.xlsx          (Excel file with student data)
â””â”€â”€ photos/                (Folder containing student photos)
    â”œâ”€â”€ 21IT001.jpg         (Photo filename = Roll Number)
    â”œâ”€â”€ 21IT002.jpg
    â””â”€â”€ 21IT003.png
```

---

# APPENDIX B: GLOSSARY OF TERMS

| Term | Definition |
|------|-----------|
| **API** | Application Programming Interface â€” a set of rules for building and interacting with software applications |
| **bcrypt** | A password-hashing function designed by Niels Provos and David MaziÃ¨res |
| **BSON** | Binary JSON â€” the binary representation used by MongoDB to store documents |
| **CORS** | Cross-Origin Resource Sharing â€” a security mechanism for controlling resource access across domains |
| **CRUD** | Create, Read, Update, Delete â€” the four basic operations of persistent storage |
| **DOM** | Document Object Model â€” a programming interface for HTML documents |
| **JWT** | JSON Web Token â€” a compact, URL-safe means of representing claims between parties |
| **MERN** | MongoDB, Express.js, React, Node.js â€” a full-stack JavaScript technology suite |
| **Middleware** | Software that acts as a bridge between an operating system or database and applications |
| **MongoDB** | A NoSQL, document-oriented database program |
| **Mongoose** | An Object Data Modeling (ODM) library for MongoDB and Node.js |
| **MVC** | Model-View-Controller â€” a software design pattern |
| **NoSQL** | A database that provides a mechanism for storage and retrieval not modeled in tabular relations |
| **npm** | Node Package Manager â€” the default package manager for Node.js |
| **ODM** | Object Document Mapper â€” maps between object model and document database |
| **REST** | Representational State Transfer â€” an architectural style for distributed systems |
| **SPA** | Single-Page Application â€” a web application that loads a single HTML page and dynamically updates |
| **SVG** | Scalable Vector Graphics â€” an XML-based vector image format |
| **UAT** | User Acceptance Testing â€” the last phase of software testing where users test the system |
| **Virtual DOM** | A lightweight copy of the actual DOM used by React for efficient rendering |

---
