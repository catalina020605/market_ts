import express, { Request, Response } from 'express';
import { verifyToken } from '../helpers/jwt-Helper';

const router = express.Router();

router.get('/profile', (req: Request, res: Response) => {
    const token = req.headers['authorization'];

    try {
        const decodedToken = verifyToken(token as string);
        return res.status(200).json({ status: '¡Bienvenido a tu perfil!', decodedToken });
    } catch (error) {
        return res.status(403).json({ status: 'Token inválido' });
    }
});

export default router;
