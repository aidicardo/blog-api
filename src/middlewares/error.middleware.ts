import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

interface HttpError extends Error {
  status?: number;
}

export const errorMiddleware = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err);
  if (err instanceof mongoose.Error.ValidationError) {
    const first = Object.values(err.errors)[0];
    res.status(400).json({ message: first?.message || 'Validation error' });
    return;
  }
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: 'Invalid ' + err.path });
    return;
  }
  res.status(err.status ?? 500).json({ message: err.message || 'Internal Server Error' });
};
