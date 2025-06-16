import { verifyJwt } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = header.slice(7);
  try {
    const payload = verifyJwt(token);
    req.user = { id: payload.sub };
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
