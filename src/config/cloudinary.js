// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

console.log("Cloudinary Configuration:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// // Cloudinary configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });


cloudinary.config({
    cloud_name: 'dr24d1ly7',
    api_key: '276977949694695',
    api_secret: '2N8lrwwFwSQg8hH4EHqOiYF-h4A'
});

module.exports = cloudinary;
