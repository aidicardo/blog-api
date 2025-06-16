import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

connectDB().then(() => {
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
});
