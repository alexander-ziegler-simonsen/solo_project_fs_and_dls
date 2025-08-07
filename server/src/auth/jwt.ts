import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your.secret.here';  

export interface JwtPayload {
  userId: string;
  email: string;
  admin: boolean;
}

// Generate a token (e.g. after successful login)
export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',      // tokens expire in 1 hour
  });
}

// Verify a token (returns the decoded payload or throws)
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
