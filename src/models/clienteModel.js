import db from "../config/db.js";


class Cliente {
    static async findAll() {
        const result = await db.execute("SELECT * FROM cliente");
        return result.rows;
    }

    static async create(email) {
        const result = await db.execute("INSERT INTO cliente (email) VALUES (?) RETURNING *", [email]);
        return result.rows[0];
    }

    // Método para obtener las rutinas de un cliente específico
    static async findRutinasByClienteId(clienteId) {
        const result = await db.execute(`
                SELECT r.* FROM rutina r
                INNER JOIN tiene t ON r.id_rutina = t.id_rutina
                WHERE t.rut = ${clienteId}
            `);
        return result.rows;
    }

    // devuelve un cliente por su id
    static async findById(clienteId) {
        const result = await db.execute(`SELECT * FROM cliente WHERE rut = ${clienteId}`);
        return result.rows[0];
    }

    // devuelve un cliente con sus detalles
    static async findClienteById(clienteId) {
        const query = `
            SELECT 
                c.id_cliente,
                c.rut,
                c.nombre,
                c.apellido,
                c.email,
                c.fecha_nacimiento,
                c.suscripcion,
                c.telefono,
                r.id_rutina,
                r.clasificacion AS clasificacion_rutina,
                e.id_ejercicio,
                e.nombre AS ejercicio_nombre,
                e.descripcion,
                e.clasificacion AS ejercicio_clasificacion,
                ct.repeticiones,
                ct.series,
                ct.secuencia
            FROM 
                cliente c
            LEFT JOIN tiene t ON c.id_cliente = t.id_cliente
            LEFT JOIN rutina r ON t.id_rutina = r.id_rutina
            LEFT JOIN contiene ct ON r.id_rutina = ct.id_rutina
            LEFT JOIN ejercicio e ON ct.id_ejercicio = e.id_ejercicio
            WHERE
                c.id_cliente = ?;
        `;
        return db.execute({ sql: query, args: [clienteId] });
    }

}

export default Cliente;
