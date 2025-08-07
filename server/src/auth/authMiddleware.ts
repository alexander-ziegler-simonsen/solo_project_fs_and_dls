// import { Request, Response, NextFunction } from 'express';
// import { verifyToken, JwtPayload } from './jwt';

// export interface AuthenticatedRequest extends Request {
//   user?: JwtPayload;
// }

// export function requireAuth(
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Missing token' });
//   }

//   const token = authHeader.replace('Bearer ', '');
//   try {
//     req.user = verifyToken(token);
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// }
