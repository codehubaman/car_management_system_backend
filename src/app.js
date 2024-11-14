const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Configure CORS
const allowedOrigins = ['https://frontend-code-car.vercel.app'];  // Vercel URL for your frontend

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g., mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow the Authorization header
    credentials: true,  // Allow cookies to be sent along with requests if needed
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Import routes
const userRoutes = require('./routes/user');
const carRoutes = require('./routes/car');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
