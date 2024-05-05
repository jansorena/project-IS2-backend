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
                WHERE t.rut = '${clienteId}'
            `);
        return result.rows;
    }

    // devuelve un cliente por su id
    static async findById(clienteId) {
        const result = await db.execute(`SELECT * FROM cliente WHERE rut = '${clienteId}'`);
        return result.rows[0];
    }



    // Método para obtener los detalles de un cliente
    static async getClienteDetalles(clienteId) {
        const result = await db.execute(`
        SELECT 
        cl.rut, cl.nombre, cl.telefono, 
        rt.id_rutina, rt.clasificacion, 
        ej.id_ejercicio, ej.nombre, ej.descripcion, ej.clasificacion AS clasificacion_ejercicio, 
        ct.repeticiones, ct.series
    FROM
        cliente cl
    LEFT JOIN tiene t ON cl.rut = t.rut
    LEFT JOIN rutina rt ON t.id_rutina = rt.id_rutina
    LEFT JOIN contiene ct ON rt.id_rutina = ct.id_rutina
    LEFT JOIN ejercicio ej ON ct.id_ejercicio = ej.id_ejercicio

    ORDER BY
        rt.id_rutina;
    
        `);
        return result.rows;
    }
}

export default Cliente;
