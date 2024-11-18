import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODONE: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.sendStatus(401); // Unauthorized
  }

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    return res.sendStatus(500); // Internal Server Error
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    req.user = user as JwtPayload;
    return next();
  });
  return;
};
