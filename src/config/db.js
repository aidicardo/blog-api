import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected');
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('MongoDB connection error:', message);
    process.exit(1);
  }
};
