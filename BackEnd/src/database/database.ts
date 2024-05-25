// db.ts
import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI = 'mongodb+srv://feygoahmad:h8cFIqexhBBCPVOU@cluster0.5fq3ach.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;
