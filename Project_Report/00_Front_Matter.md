
---

<div align="center">

# PROJECT REPORT

## on

# AttendanceIQ — Smart Attendance Management System

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

**Academic Year: 2025–2026**

</div>

---

<div align="center">

## CERTIFICATE

</div>

This is to certify that the project entitled **"AttendanceIQ — Smart Attendance Management System"** is a bonafide work carried out by **[Student Name]** (Roll No: **[Roll Number]**) in partial fulfillment of the requirements for the degree of **Bachelor of Technology** in **[Department]** from **[University Name]** during the academic year **2025–2026**.

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

I hereby declare that the project entitled **"AttendanceIQ — Smart Attendance Management System"** submitted to **[University Name]** in partial fulfillment of the requirements for the award of the degree of **Bachelor of Technology** in **[Department]** is a record of original work done by me under the guidance of **[Guide Name]**, **[Designation]**, **[College Name]**.

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

The system was developed following a three-tier client-server architecture and was validated through 45 unit tests, 3 integration test workflows, and 12 user acceptance test scenarios—all passing successfully. The responsive, mobile-first design ensures seamless operation across desktop, tablet, and mobile devices.

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
