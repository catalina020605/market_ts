import { Request, Response } from "express";
import authMiddleware from "../middleware/auth-middleware";

const auth = async (req: Request, res: Response) => {
    await authMiddleware(req, res);
};

export default auth;