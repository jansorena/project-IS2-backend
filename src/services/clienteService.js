import Cliente from '../models/clienteModel.js';

export async function getAllClientes() {
    return await Cliente.findAll();
}

export async function addCliente(email) {
    return await Cliente.create(email);
}

export async function getRutinasByClienteId(clienteId) {
    return await Cliente.findRutinasByClienteId(clienteId);
}

export async function getClienteById(clienteId) {
    return await Cliente.findById(clienteId);
}

export async function getClienteDetalles(clienteId) {
    return await Cliente.getClienteDetalles(clienteId);
}