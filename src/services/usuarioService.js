import Usuario from '../models/usuarioModel.js';

export const getUserByEmail = async (email) => {
    const user = await Usuario.findByEmail(email);
    return user;
};

export const getUserById = async (id) => {
    return await Usuario.findById(id);
};

export const createUser = async (userData) => {
    const user = await Usuario.create(userData);
    return user;
};

export const updateUser = async (userId, userData) => {
    const user = await Usuario.update(userId, userData);
    return user;
};

export const deleteUser = async (id) => {
    return await Usuario.delete(id);
};

export const getAllUsers = async () => {
    return await Usuario.findAll();
};



