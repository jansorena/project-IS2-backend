import * as usuarioService from '../services/usuarioService.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await usuarioService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await usuarioService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await usuarioService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userData = req.body;
        const updatedUser = await usuarioService.updateUser(userId, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await usuarioService.deleteUser(userId);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const user = await usuarioService.getUserByEmail(email);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};


