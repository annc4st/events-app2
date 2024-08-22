require('dotenv').config();
// console.log('MONGO_URI:', process.env.MONGO_URI);
// console.log('SECRET:', process.env.SECRET);
// console.log('PORT:', process.env.PORT);

const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./utils/db');

//import routes
const eventRoutes = require('./routes/eventRoutes')
const userRoutes = require('./routes/userRoutes')


// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

//Routes
app.use('/api/events', eventRoutes)
app.use('/api/auth', userRoutes)

// Start the server
const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

