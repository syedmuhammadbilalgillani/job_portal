import jwt from 'jsonwebtoken';
import User from '../models/user_model.js';

// Middleware to verify token
export async function verifyToken(req, res, next) {
    try {
        // Extract JWT token from the request headers
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken?._id) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        // Find the user
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }

        // Attach the user object to the request
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Middleware to check user roles
export const addRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access Forbidden: You do not have the right permissions' });
    }
    next();
};

// Route handler to check user role
export const checkRole = (req, res) => {
    try {
        const userRole = req.user.role; // Assuming user is authenticated and req.user contains the logged-in user
        res.status(200).json({ role: userRole });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

