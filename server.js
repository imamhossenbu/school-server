// STEP 1: Import necessary packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Import middlewares
const errorHandler = require('./src/middlewares/errorHandler.middleware');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const classRoutes = require('./src/routes/class.routes');
const subjectRoutes = require('./src/routes/subject.routes');
const attendanceRoutes = require('./src/routes/attendance.routes');
const examRoutes = require('./src/routes/exam.routes');
const resultRoutes = require('./src/routes/result.routes');
const feeStructureRoutes = require('./src/routes/feeStructure.routes');
const feePaymentRoutes = require('./src/routes/feePayment.routes');
const noticeRoutes = require('./src/routes/notice.routes');
const eventRoutes = require('./src/routes/event.routes');
const salaryPaymentRoutes = require('./src/routes/salaryPayment.routes');
const expenseRoutes = require('./src/routes/expense.routes');
const teacherRoutes = require('./src/routes/teacher.routes');
const timetableRoutes = require('./src/routes/timetable.routes');
const studentRoutes = require('./src/routes/student.routes');
const guardianRoutes = require('./src/routes/guardian.routes');

// Load environment variables
dotenv.config();

// STEP 2: Connect to Database
connectDB();

// Initialize express app
const app = express();

// STEP 3: Use Core Middlewares
app.use(cors());
app.use(express.json());

// STEP 4: Define API Routes
app.get('/', (req, res) => {
    res.send('School Management API is running on the server...');
    console.log('All are okey');
});




// STEP 5: Use Error Handling Middleware
app.use(errorHandler);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/feestructures', feeStructureRoutes);
app.use('/api/feepayments', feePaymentRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/salary-payments', salaryPaymentRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/timetables', timetableRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/guardians', guardianRoutes);

// STEP 6: Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});