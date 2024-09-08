import mongoose from 'mongoose';
import { DATABASE_URL } from './env';

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      autoIndex: true,
      // dbName: "sanber-be-59",
      dbName: 'cluster-farraz-course1',
      connectTimeoutMS: 10000,
    });
    console.log('MongoDB => Database connected');
  } catch (error) {
    console.log(error);
    console.log('Error connecting to database');
  }
};

export default connectDB;
