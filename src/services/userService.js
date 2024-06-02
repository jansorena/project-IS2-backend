import Usuario from '../models/usuarioModel.js';

export const getUserByEmail = async (email) => {
    const user = await Usuario.findByEmail(email);
    return user;
};

export const getUserById = async (id) => {
    const user = await Usuario.findById(id);
    return user;
};

export const createUser = async (userData) => {
    const user = await Usuario.create(userData);
    return user;
};
