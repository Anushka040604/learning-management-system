import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();


router.post('/register', registerUser);

router.post('/login', loginUser);

// Logout user (requires authentication)
router.post('/logout', protect, logoutUser);
router.get('/', authMiddleware, getUser); 
// A protected route (requires authentication and admin role)
router.get('/admin', protect, authorize('admin'), (req, res) => {
    res.status(200).json({ message: 'Welcome, Admin!' });
});

export default router;
