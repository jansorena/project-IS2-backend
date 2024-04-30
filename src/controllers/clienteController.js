import * as clienteService from '../services/clienteService.js';

export const getAllClientes = async (req, res) => {
    try {
        const clientes = await clienteService.getAllClientes();
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
}
