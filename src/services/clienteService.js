import Cliente from '../models/clienteModel.js';

export async function getAllClientes() {
    return await Cliente.findAll();
}

export async function addCliente(email) {
    return await Cliente.create(email);
}
