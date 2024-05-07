// routes/auth.ts
import { Request, Response } from "express";
import authMiddleware from "../middleware/auth-middleware";
import { generateToken } from "../helpers/jwt-Helper";
import Auth from "../Dto/authDto";

const auth = async (req: Request, res: Response) => {
    authMiddleware(req, res)
};

export default auth;
