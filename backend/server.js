import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.js';
import eventRoutes from './routes/eventRoutes.js';
// import startScheduler from './utils/sendReminderScheduler.js';

// Load environment variables
dotenv.config();

const app = express();

// ===== ✅ CORS FIX for Render Deployment =====
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  'https://event-reminder-frontend.vercel.app', // <-- add your deployed frontend domain here
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS policy violation: Origin not allowed'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// ===== Middleware =====
app.use(express.json({ limit: '10mb' }));

// ===== Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// ===== Test Route =====
app.get('/', (req, res) => res.json({ status: '✅ Event Reminder Backend is running!' }));

// ===== PORT =====
const PORT = process.env.PORT || 4000;

// ===== MongoDB Connection =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
    // startScheduler();
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
