const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://mai6228731:4p8hDaISmXDQODhH@moviematch.qcipk.mongodb.net/');
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('MongoDB connection error', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;