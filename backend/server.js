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

// Middleware
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Test route
app.get('/', (req, res) => res.json({ ok: true }));

// Port
const PORT = process.env.PORT || 4000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log('Server listening on', PORT);
    });
    // Start the reminders scheduler
    // startScheduler();
  })
  .catch(err => console.error('DB error', err));
