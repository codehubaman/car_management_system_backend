// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies?.token;
    console.log("Token from cookies:", token); // Debugging token retrieval
    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Token successfully decoded:", decoded); // Debugging token verification
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message); // Log error details
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = auth;
