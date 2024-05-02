// helpers/jwtHelper.ts
import jwt from 'jsonwebtoken';

const secretKey = 'cata';

const generateToken = (email: string) => {
    
    return jwt.sign({ email }, secretKey, { expiresIn: '24h' });
};

const verifyToken = (token: string) => {
    try {
        const decodedToken = jwt.verify(token, secretKey);
        return decodedToken;
    } catch (err) {
        throw new Error('Token inválido');
    }
};

export { generateToken, verifyToken };
