import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/eventController.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', getEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;