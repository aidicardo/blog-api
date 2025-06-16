import { Request, Response, NextFunction } from 'express';

export interface HttpError extends Error {
  status?: number;
}

export const errorMiddleware = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};
