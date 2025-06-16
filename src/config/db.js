import fs from 'fs-extra';
import path from 'path';
import { env } from './env.js';

let db = { posts: [], users: [] };
const file = path.resolve(env.dataFile);

export const connectDB = async () => {
  try {
    const exists = await fs.pathExists(file);
    if (exists) {
      db = await fs.readJson(file);
    } else {
      await fs.writeJson(file, db, { spaces: 2 });
    }
    console.log('Loaded database from ' + file);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Database error:', message);
    process.exit(1);
  }
};

export const getDB = () => db;
export const saveDB = () => fs.writeJson(file, db, { spaces: 2 });
