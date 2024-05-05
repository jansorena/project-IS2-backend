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
    const result = await Cliente.findClienteById(clienteId);  // Usa la función correcta del modelo
    const rows = result.rows;

    if (rows.length === 0) {
        return null;  // Retorna null si no hay datos para el cliente
    }

    // Procesa los resultados para estructurarlos jerárquicamente
    const cliente = {
        id_cliente: rows[0].id_cliente,
        rut: rows[0].rut,
        nombre: rows[0].nombre,
        apellido: rows[0].apellido,
        email: rows[0].email,
        fecha_nacimiento: rows[0].fecha_nacimiento,
        suscripcion: rows[0].suscripcion,
        telefono: rows[0].telefono,
        rutinas: []
    };

    rows.forEach(row => {
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
                secuencia: row.secuencia
            });
        }
    });

    return cliente;
}