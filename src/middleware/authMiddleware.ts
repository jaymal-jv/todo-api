import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { MESSAGE, STATUS_CODES } from '../utils/constants';

interface AuthRequest extends Request {
  user?: { userId: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({ error: MESSAGE.UNAUTHORIZED });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(STATUS_CODES.UNAUTHORIZED).json({ error: MESSAGE.UNAUTHORIZED });
  }
};