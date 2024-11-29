import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();

// Connect to Database
connectDB();

app.use(cors({
    origin: 'http://localhost:5173', // Client URL
    credentials: true, // Allow credentials (cookies)
}));
app.use(cookieParser());

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes); 
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/enroll', enrollmentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
