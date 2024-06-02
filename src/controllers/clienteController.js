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

// Controlador para obtener todas las rutinas de un cliente específico
export const getRutinasByClienteId = async (req, res) => {
    try {
        const clienteId = req.params.clienteId;  // Asume que el ID viene como parámetro de la ruta
        const rutinas = await clienteService.getRutinasByClienteId(clienteId);
        res.status(200).json(rutinas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};


// Controlador para obtener un cliente por su ID
export const getClienteById = async (req, res) => {
    try {
        const clienteId = req.params.clienteId;  // Asume que el ID viene como parámetro de la ruta
        const cliente = await clienteService.getClienteById(clienteId);
        res.status(200).json(cliente);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener un cliente con sus rutinas y ejercicios
export const getClienteDetalles = async (req, res) => {
    try {
        const clienteId = parseInt(req.params.clienteId)
        const clienteDetalles = await clienteService.getClienteDetalles(clienteId);
        res.status(200).json(clienteDetalles);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Controlador para agregar un cliente
export const addCliente = async (req, res) => {
    try {
        const cliente = req.body;
        const newCliente = await clienteService.addCliente(cliente);
        res.status(201).json(newCliente);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};