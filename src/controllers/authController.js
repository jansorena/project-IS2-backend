import jwt from 'jsonwebtoken';
import { hashPassword } from '../utils/passwordUtils.js';
import { createUser } from '../services/usuarioService.js';

const JWT_SECRET = process.env.PRIVATE_KEY;

export const login = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const token = jwt.sign({ id: req.user.id_usuario, role: req.user.role }, JWT_SECRET, { expiresIn: '1h' }); // Usa req.user.id_usuario
        res.cookie('token', token, { httpOnly: true, secure: false }).json({ success: true, token, user: req.user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ success: true });
};

export const getProfile = (req, res) => {
    res.json(req.user);
};

export const register = async (req, res) => {
    try {
        const { email, password, nombre, apellido, role, especialidad } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await createUser({ email, password: hashedPassword, nombre, apellido, role, especialidad });
        res.status(201).json({ success: true, user });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
