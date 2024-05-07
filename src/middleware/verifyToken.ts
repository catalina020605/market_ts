import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "../helpers/jwt-Helper";

const authCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.body.user = decoded.email; // Guarda el usuario decodificado en el objeto de solicitud para usarlo en el controlador
    next();
  });
};

export default authCheckMiddleware;
