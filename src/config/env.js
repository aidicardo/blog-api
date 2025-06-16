import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'changeMe',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshSecret: process.env.REFRESH_SECRET || 'changeMeToo',
  refreshExpiresIn: process.env.REFRESH_EXPIRES_IN || '7d',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/blogapi',
};
