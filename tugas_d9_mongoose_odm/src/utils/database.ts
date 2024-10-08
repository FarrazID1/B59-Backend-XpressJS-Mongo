import mongoose from 'mongoose';
import { DATABASE_URL } from './env';

const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      autoIndex: true,
      dbName: 'cluster-farraz-course1',
      connectTimeoutMS: 10000,
    });
    console.log('Database (MongoDB) connected');
  } catch (error) {
    console.log(error);
    console.log('Error connecting to database');
  }
};

export default connect;
