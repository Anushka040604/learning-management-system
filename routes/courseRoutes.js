import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { createCourse, getCourses, updateCourse, deleteCourse, addStudentToCourse } from '../controllers/courseController.js';

const router = express.Router();

// Route for creating a course (only for admin and moderator)
router.post('/', protect, authorize('moderator', 'admin'), createCourse);

// Route for getting all courses (public)
router.get('/', getCourses);

// Route for updating a course (only for admin and moderator)
router.put('/:id', protect, authorize('moderator', 'admin'), updateCourse);

// Route for deleting a course (only for admin)
router.delete('/:id', protect, authorize('admin'), deleteCourse);

// Route for adding a student to a course (only for admin or instructor)
router.post('/add-student', protect, authorize('moderator', 'admin'), addStudentToCourse);

export default router;
