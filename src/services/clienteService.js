import Cliente from '../models/clienteModel.js';

export async function getAllClientes() {
    const clientes = await Cliente.findAll();
    if (!clientes || clientes.length === 0) {
        return [];  // Retorna un arreglo vacío si no hay clientes
    }

    // Procesar los datos para asegurarse de que se devuelvan en el formato adecuado
    return clientes.map(cliente => ({
        id_cliente: cliente.id_cliente,
        rut: cliente.rut,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        email: cliente.email,
        fecha_nacimiento: cliente.fecha_nacimiento,
        suscripcion: cliente.suscripcion,
        telefono: cliente.telefono,
        foto: cliente.foto
    }));
}

export async function addCliente(email) {
    return await Cliente.create(email);
}

export async function getClienteById(clienteId) {
    return await Cliente.findById(clienteId);
}

export async function updateCliente(clienteId, clienteData) {
    return await Cliente.updateClienteById(clienteId, clienteData);
}

export async function getRutinasByClienteId(clienteId) {
    const rutinas = await Cliente.findRutinasByClienteId(clienteId);
    for (const rutina of rutinas) {
        rutina.circuitos = await Cliente.findCircuitosByRutinaId(rutina.id_rutina);
        for (const circuito of rutina.circuitos) {
            circuito.ejercicios = await Cliente.findEjerciciosByCircuitoId(circuito.id_circuito);
        }
    }
    return rutinas;
}