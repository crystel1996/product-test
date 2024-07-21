import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY; // Replace with your actual secret key

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    if (req.path === '/api/auth/login') {
        return next();
    }

  const authHeader = req.headers["Authorization"] as string;
  const token = authHeader && authHeader?.startsWith("Bearer ") 
    ? authHeader?.split(" ")[1] 
    : null;

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token, secretKey || '');
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};