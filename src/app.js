import express from 'express';
import postRoutes from './routes/post.routes.js';
import authRoutes from './routes/auth.routes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import { logger } from './utils/logger.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(logger);
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(errorMiddleware);

export default app;
