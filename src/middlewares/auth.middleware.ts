import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.js';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const token = header.slice(7);
  try {
    const payload = verifyJwt(token) as { sub: string };
    (req as any).user = { id: payload.sub };
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
