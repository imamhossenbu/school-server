# 🏫 School Management System - Backend REST API

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-5.1.0-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Secure_Auth-000000?style=for-the-badge&logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A robust, modular, and scalable **RESTful API** engine powering the School Management System. Built using **Node.js**, **Express.js (v5)**, and **MongoDB with Mongoose**, featuring comprehensive role-based access control (RBAC), automated email notifications, and over 17 distinct functional domain modules.

---

## 📑 Table of Contents
- [✨ Key Features](#-key-features)
- [📊 Current Development Status (এখন কতটুকু করা হয়েছে)](#-current-development-status-এখন-কতটুকু-করা-হয়েছে)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Architecture & Project Structure](#-architecture--project-structure)
- [🔌 API Endpoints Summary](#-api-endpoints-summary)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Environment Setup](#installation--environment-setup)
- [🔮 Future Roadmap & Development Plan (সামনে কি কি করা যায়)](#-future-roadmap--development-plan-সামনে-কি-কি-করা-যায়)
- [🤝 Contributing & License](#-contributing--license)

---

## ✨ Key Features

- 🔐 **Authentication & Authorization**:
  - Secure password hashing with `bcryptjs`.
  - Stateless JSON Web Token (`JWT`) authentication.
  - Multi-tier Role-Based Access Control (`Admin`, `Teacher`, `Student`, `Guardian`).
- 📧 **Automated Email Services**: Password reset token generation and automated emails via `Nodemailer` (SMTP).
- 📚 **Comprehensive Academic Suite**: Classes, Subjects, Exams, Timetables, and Student Results management.
- 📋 **Attendance Tracking**: Class-wise daily attendance marking and individual student attendance reporting.
- 💰 **Financial & Accounts Management**:
  - Fee structure configuration by class.
  - Student fee payment collection and monthly revenue reports.
  - Teacher/Staff salary disbursement logging.
  - Institutional expense tracking and categorization.
- 📢 **Communication Hub**: Targeted notice boards (broadcast to all, or specific roles) and school event calendars.

---

## 📊 Current Development Status (এখন কতটুকু করা হয়েছে)

The backend API is **~90-95% complete** in terms of database schemas, controller business logic, and RESTful routing.

### ✅ Completed Modules:

| Module | Routes Prefix | Status | Capabilities |
| :--- | :--- | :---: | :--- |
| **Authentication** | `/api/auth` | ✅ 100% | Register, Login, Forgot Password, Reset Password, Update Profile, Change Password |
| **User Management** | `/api/users` | ✅ 100% | User CRUD, role filtering, `me` profile lookup |
| **Classes** | `/api/classes` | ✅ 100% | CRUD, assign class teacher, enroll students |
| **Subjects** | `/api/subjects` | ✅ 100% | CRUD, class association, teacher assignment |
| **Attendance** | `/api/attendance` | ✅ 100% | Bulk daily attendance marking, date-wise class records, student percentage summary |
| **Exams** | `/api/exams` | ✅ 100% | Exam creation, term dates, and exam schedules |
| **Results** | `/api/results` | ✅ 100% | Subject-wise mark recording, grade evaluation, student transcript lookup |
| **Fee Structures** | `/api/feestructures` | ✅ 100% | Class-wise fee definition, fee types (monthly, admission, exam) |
| **Fee Payments** | `/api/feepayments` | ✅ 100% | Payment entry, invoice receipts, monthly collection aggregation |
| **Salary Payments**| `/api/salary-payments` | ✅ 100% | Staff salary issuance, monthly payroll tracking |
| **Expenses** | `/api/expenses` | ✅ 100% | Operational expense logging, category filtering |
| **Timetables** | `/api/timetables` | ✅ 100% | Class routine builder (day, period, room, subject, teacher) |
| **Teachers** | `/api/teachers` | ✅ 100% | Extended teacher profile data, qualification, designation |
| **Students** | `/api/students` | ✅ 100% | Extended student profile, roll number, section, guardian link |
| **Guardians** | `/api/guardians` | ✅ 100% | Guardian profile, contact information, linked children |
| **Notices** | `/api/notices` | ✅ 100% | Targeted announcements, priority flags, publication dates |
| **Events** | `/api/events` | ✅ 100% | School calendar events, holidays, extracurricular schedule |

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (v18+)
- **Web Framework**: [Express.js](https://expressjs.com/) (v5.1.0)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) (v8.18)
- **Authentication**: [jsonwebtoken (JWT)](https://jwt.io/), [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Email Service**: [Nodemailer](https://nodemailer.com/)
- **CORS & Environment**: `cors`, `dotenv`

---

## 📁 Architecture & Project Structure

The project follows a clean **MVC (Model-View-Controller)** pattern:

```
server/
├── src/
│   ├── config/
│   │   └── db.js                       # MongoDB connection setup
│   ├── controllers/                    # Business logic and request handlers (17 controllers)
│   │   ├── attendance.controller.js
│   │   ├── auth.controller.js
│   │   ├── class.controller.js
│   │   ├── event.controller.js
│   │   ├── exam.controller.js
│   │   ├── expense.controller.js
│   │   ├── feePayment.controller.js
│   │   ├── feeStructure.controller.js
│   │   ├── guardian.controller.js
│   │   ├── notice.controller.js
│   │   ├── result.controller.js
│   │   ├── salaryPayment.controller.js
│   │   ├── student.controller.js
│   │   ├── subject.controller.js
│   │   ├── teacher.controller.js
│   │   ├── timetable.controller.js
│   │   └── user.controller.js
│   ├── middlewares/                    # Security, auth, and error handling
│   │   ├── auth.middleware.js          # JWT verification & req.user attachment
│   │   ├── checkRole.middleware.js     # Role verification (RBAC)
│   │   └── errorHandler.middleware.js  # Global error interceptor
│   ├── models/                         # Mongoose Data Schemas (15 schemas)
│   │   ├── Attendance.model.js
│   │   ├── Class.model.js
│   │   ├── Event.model.js
│   │   ├── Exam.model.js
│   │   ├── Expense.model.js
│   │   ├── FeePayment.model.js
│   │   ├── FeeStructure.model.js
│   │   ├── Notice.model.js
│   │   ├── Result.model.js
│   │   ├── SalaryPayment.model.js
│   │   ├── Student.model.js
│   │   ├── Subject.model.js
│   │   ├── Teacher.model.js
│   │   ├── Timetable.model.js
│   │   └── User.model.js
│   ├── routes/                         # Express Route definitions (17 route files)
│   └── utils/
│       └── sendEmail.js                # SMTP email dispatcher
├── .env.example                        # Template for environment variables
├── package.json                        # Server configuration and dependencies
└── server.js                           # Application entry point
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user | Public |
| **POST** | `/api/auth/login` | Login and receive JWT | Public |
| **POST** | `/api/auth/forgot-password` | Request password reset email | Public |
| **PUT** | `/api/auth/reset-password/:token`| Reset password using token | Public |
| **GET** | `/api/users/me` | Get logged-in user profile | Authenticated |
| **GET/POST** | `/api/classes` | Fetch or create school classes | Admin / Teacher |
| **GET/POST** | `/api/subjects` | Fetch or create class subjects | Admin |
| **POST** | `/api/attendance` | Record daily attendance sheet | Admin / Teacher |
| **GET** | `/api/attendance/student/:id` | Get attendance percentage report | Admin / Teacher / Student |
| **POST** | `/api/results` | Submit student exam marks | Admin / Teacher |
| **GET** | `/api/feepayments/report/monthly`| Monthly tuition fee collection report | Admin |
| **GET/POST** | `/api/notices` | View notices or publish new bulletin | Role-dependent |
| **GET/POST** | `/api/timetables` | View or create class schedule | Authenticated |

---

## 🚀 Getting Started

### Prerequisites
- Node.js: **v18.x or higher**
- MongoDB: Local instance or MongoDB Atlas connection string
- SMTP credentials (Gmail App Password or SMTP provider)

### Installation & Environment Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/imamhossenbu/school-server.git
   cd school-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Fill in your configuration details:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/school_management?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key
   FRONTEND_URL=http://localhost:3000

   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Start the Server**:
   - For development with auto-reload:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     node server.js
     ```

5. **Verify Running State**:
   Visit [http://localhost:5000](http://localhost:5000) to see:
   `"School Management API is running on the server..."`

---

## 🔮 Future Roadmap & Development Plan (সামনে কি কি করা যায়)

### 📌 Phase 1: Payment Gateway Integration
- [ ] Integration with Bangladeshi payment gateways: **bKash (Checkout API)**, **Nagad**, and **SSLCommerz**.
- [ ] Webhook handlers to automatically update invoice statuses to `Paid` upon successful transaction.
- [ ] Automated payment receipt generation and email dispatch to guardians.

### 📌 Phase 2: Automated Communication & SMS Gateway
- [ ] **SMS Integration** (Greenweb, Twilio, or Teletalk) for:
  - Immediate absence notification to guardians ("Your child is marked absent today").
  - Examination result publication alerts.
  - Fee payment reminder notices.

### 📌 Phase 3: Media & Cloud Storage
- [ ] Integrate **Cloudinary** or **AWS S3** via `multer` for:
  - Student, Teacher, and Guardian profile photos.
  - Digital syllabus, homework attachments, and class notice PDFs.

### 📌 Phase 4: Cron Jobs & Automation
- [ ] Automated monthly fee invoice generation on the 1st of every month via `node-cron`.
- [ ] Periodic database backup routines.

### 📌 Phase 5: Security Hardening & Performance
- [ ] Add `helmet` for security headers.
- [ ] Implement `express-rate-limit` for DDoS and brute-force protection.
- [ ] Input validation and sanitization using `Joi` or `Zod`.
- [ ] Redis caching for frequently accessed static queries (e.g., classes, subjects, notice boards).

---

## 🤝 Contributing & License

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/imamhossenbu/school-server/issues).

Distributed under the **MIT License**.
