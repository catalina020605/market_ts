// routes/auth.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserRepository from "../repositories/UserRepository";
import { generateToken } from "../helpers/jwt-Helper";
import Auth from "../Dto/authDto";

const authMiddleware = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result : any= await UserRepository.login(new Auth(email,password));
        const rows = result[0];
        if (rows.length > 0) {
            const isPasswordValid = await bcrypt.compare(password, rows[0].password);

            if (!isPasswordValid) {
                return res.status(401).json({ status: 'incorrect username or password' });
            }

            const token = generateToken(email);

            return res.status(200).json({ status: 'correct username and password', token });
        } else {
            return res.status(401).json({ status: 'incorrect username or password' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default authMiddleware;

