// helpers/jwtHelper.ts
import jwt from 'jsonwebtoken';

const secretKey = 'sofia20';

const generateToken = (email: string) => {
    
    return jwt.sign({ email }, secretKey, { expiresIn: '24h' });
};

export { secretKey, generateToken};