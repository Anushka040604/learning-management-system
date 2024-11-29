import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { getUsers, updateUserRole } from '../controllers/userController.js';

const router = express.Router();

router.get('/', protect, authorize('admin'), getUsers);
router.put('/:id/role', protect, authorize('admin'), updateUserRole);

export default router;
