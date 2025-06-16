import morgan from 'morgan';
import type { Handler } from 'express';

export const logger: Handler = morgan('dev');
