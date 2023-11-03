import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SecretKey } from "../config/keys.config";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer")) {
    const token = header.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SecretKey);
      req.body = decoded;
      //   req.user = decoded;
      next();
    } catch (err) {
      res.status(401);
      return next(new Error("User is not authorized"));
    }
  } else {
    res.status(401);
    return next(new Error("User is unauthorized or token is missing"));
  }
};

export default validateToken;
