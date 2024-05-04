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
}

export default Cliente;
