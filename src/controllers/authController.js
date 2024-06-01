import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.PRIVATE_KEY;

export const getHome = (req, res) => {
    const userObj = req.user ? req.user.toObject() : null;
    res.render('home', { title: 'Home', style: 'home.css', user: userObj });
};

export const getProfile = (req, res) => {
    const { first_name, last_name, email, age, role } = req.user;
    res.render('profile', {
        role, first_name, last_name, email, age, title: 'Profile Page', style: 'profile.css'
    });
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
};

export const login = async (req, res) => {
    try {
        const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: false }).redirect('/');
    }
    catch (error) {
        console.error('Login error:', error);
        res.redirect('/auth/login');
    }
};






