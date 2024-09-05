import mongoose from 'mongoose';
import { DATABASE_URL } from './env';

const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: 'cluster-farraz-course1',
    });
    return 'Database connected';
  } catch (error) {
    // return error;
    console.log(error);
    console.log('Error connecting to database');
  }
};

export default connect;
