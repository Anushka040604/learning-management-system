import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Ensure this is properly populated
        console.log('Decoded Token:', req.user);  // Log the decoded token for debugging
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};


export const authorize = (...roles) => {
    return (req, res, next) => {
        console.log('Decoded Token:', req.user);
        console.log('User Role:', req.user.role);
        console.log('Allowed Roles:', roles);
        if (!roles.includes(req.user.role)) {
            console.error(`Access denied: User role (${req.user.role}) not in allowed roles (${roles})`);
            return res.status(403).json({ message: 'Forbidden, insufficient permissions' });
        }
        next();
    };
};

