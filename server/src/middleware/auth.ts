import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  sub: string;        
  username: string;
}

// Extend Express’s Request type so TS knows about req.user
declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or malformed token.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || 'super-secret'
    ) as JwtPayload;

    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
}
