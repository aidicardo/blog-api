import dotenv from 'dotenv';
dotenv.config();

const requireEnv = key => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
};

export const env = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  jwtSecret: requireEnv('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshSecret: requireEnv('REFRESH_SECRET'),
  refreshExpiresIn: process.env.REFRESH_EXPIRES_IN || '7d',
  dataFile: process.env.DATA_FILE || 'db.json',
};
