const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // process.env.MONGO_URI is loaded from the .env file
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully via config...');
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;