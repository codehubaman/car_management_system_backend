// routes/car.js
const express = require('express');
const auth = require('../middleware/auth');
const multer = require('multer');
const cloudinary = require('../config/cloudinary.js');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Car = require('../models/Car');

const router = express.Router();

// Cloudinary storage configuration for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cars', // Specify the folder in Cloudinary where the images will be stored
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Supported image formats
    }
});

const upload = multer({ storage: storage });

// Confirm that car routes file is loaded
console.log("Car routes file loaded");

// Create a new car (POST /api/cars)
router.post('/', auth, upload.array('images', 5), async (req, res) => {
    console.log("Received POST request to /api/cars"); // Debug request
    const { title, description, tags } = req.body;

    // If there are no images uploaded
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No images uploaded' });
    }

    // Get the URLs of the uploaded images from Cloudinary
    const images = req.files.map(file => file.path); // file.path contains the Cloudinary URL

    try {
        const car = new Car({
            title,
            description,
            images,
            tags,
            userId: req.user.id
        });

        const savedCar = await car.save();
        console.log("Car created successfully:", savedCar); // Debugging successful save
        res.status(201).json(savedCar);
    } catch (error) {
        console.error("Error creating car:", error.message); // Log error details
        res.status(400).json({ message: 'Failed to create car', error: error.message });
    }
});

// Get all cars (GET /api/cars)
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find(); // Retrieve all cars from database
        console.log("Cars retrieved:", cars); // Debugging successful retrieval
        res.status(200).json(cars);
    } catch (error) {
        console.error("Error retrieving cars:", error.message); // Log error details
        res.status(400).json({ message: 'Failed to retrieve cars', error: error.message });
    }
});

// Get car by ID (GET /api/cars/:id)
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.findById(id); // Find car by ID from database
        if (!car) {
            return res.status(404).json({ message: 'Car not found' }); // Car not found
        }
        console.log("Car retrieved by ID:", car); // Debugging successful retrieval
        res.status(200).json(car);
    } catch (error) {
        console.error("Error retrieving car by ID:", error.message); // Log error details
        res.status(400).json({ message: 'Failed to retrieve car by ID', error: error.message });
    }
});

module.exports = router;
