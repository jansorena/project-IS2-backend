import jwt from 'jsonwebtoken';

const PRIVATE_KEY = process.env.PRIVATE_KEY

export const generateToken = (user) => {
    return jwt.sign({ id: user.id_usuario, email: user.email }, PRIVATE_KEY, { expiresIn: '1h' });
};