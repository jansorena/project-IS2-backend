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

export async function getRutinasByClienteId(clienteId) {
    return await Cliente.findRutinasByClienteId(clienteId);
}

export async function getClienteById(clienteId) {
    return await Cliente.findById(clienteId);
}

export async function updateCliente(clienteId, clienteData) {
    return await Cliente.updateClienteById(clienteId, clienteData);
}

export async function getClienteDetalles(clienteId) {
    const result = await Cliente.findClienteById(clienteId);

    if (!result || result.length === 0) {
        return null;  // Retorna null si no hay datos para el cliente
    }

    // Procesa los resultados para estructurarlos jerárquicamente
    const cliente = {
        id_cliente: result[0].id_cliente,
        rut: result[0].rut,
        nombre: result[0].nombre,
        apellido: result[0].apellido,
        email: result[0].email,
        fecha_nacimiento: result[0].fecha_nacimiento,
        suscripcion: result[0].suscripcion,
        telefono: result[0].telefono,
        rutinas: []
    };

    result.forEach(row => {
        let rutina = cliente.rutinas.find(r => r.id_rutina === row.id_rutina);
        if (!rutina && row.id_rutina) {
            rutina = {
                id_rutina: row.id_rutina,
                clasificacion: row.clasificacion_rutina,
                ejercicios: []
            };
            cliente.rutinas.push(rutina);
        }

        if (rutina && row.id_ejercicio) {
            rutina.ejercicios.push({
                id_ejercicio: row.id_ejercicio,
                nombre: row.ejercicio_nombre,
                descripcion: row.descripcion,
                clasificacion: row.ejercicio_clasificacion,
                repeticiones: row.repeticiones,
                series: row.series,
                orden: row.orden,
                descanso: row.descanso_circuito
            });
        }
    });

    return cliente;
}
