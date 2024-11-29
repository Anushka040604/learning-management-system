import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { enrollInCourse } from '../controllers/enrollmentController.js';

const router = express.Router();

router.post('/:id/enroll', protect, authorize('user'), enrollInCourse);

export default router;
