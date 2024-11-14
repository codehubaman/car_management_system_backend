// index.js
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const dbConnect = require('../src/db/connect.js');
const userRoutes = require('../src/routes/user.js');
const carRoutes = require('../src/routes/car.js');

// Load environment variables
dotenv.config();

// Connect to MongoDB
dbConnect();

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());

// Log to verify server startup and middleware setup
console.log("Server is starting...");
console.log("Connected middlewares: JSON parser, cookie parser");

// Route handlers
app.use('/api/users', userRoutes);
console.log("User routes initialized");

app.use('/api/cars', carRoutes);
console.log("Car routes initialized");

// Default route for API documentation
app.get('/api/docs', (req, res) => {
    res.send('API Documentation placeholder');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
