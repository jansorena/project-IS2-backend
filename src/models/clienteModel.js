import db from "../config/db.js";

class Cliente {
    static async findAll() {
        try {
            const result = await db.execute({
                sql: "SELECT * FROM cliente",
                args: [],
            });
            console.log('Result:', result);
            // Verificar que result.rows no sea undefined o null
            if (!result || !result.rows) {
                console.error('No se encontraron filas en la consulta.');
                return [];  // Retorna un arreglo vacío si no hay resultados
            }
            return result.rows;
        } catch (error) {
            console.error('Error ejecutando findAll:', error);
            throw new Error('Error ejecutando findAll');
        }
    }
    static async findByEmail(email) {
        const result = await db.execute({
            sql: "SELECT * FROM cliente WHERE email = ?",
            args: [email],
        });
        return result.rows[0];
    }

    static async findById(clienteId) {
        const result = await db.execute({
            sql: "SELECT * FROM cliente WHERE id_cliente = ?",
            args: [clienteId],
        });
        return result.rows[0];
    }

    static async create(clienteData) {
        const { rut, nombre, apellido, email, fecha_nacimiento, suscripcion, telefono, foto } = clienteData;
        const result = await db.execute({
            sql: "INSERT INTO cliente (rut, nombre, apellido, email, fecha_nacimiento, suscripcion, telefono, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *",
            args: [rut, nombre, apellido, email, fecha_nacimiento, suscripcion, telefono, foto],
        });
        return result.rows[0];
    }

    static async findRutinasByClienteId(clienteId) {
        const result = await db.execute({
            sql: `
                SELECT r.* FROM rutina r
                INNER JOIN tiene t ON r.id_rutina = t.id_rutina
                WHERE t.id_cliente = ?
            `,
            args: [clienteId],
        });
        return result.rows;
    }

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
                ce.series,
                ce.frecuencia,
                ce.orden,
                ce.descanso AS descanso_circuito
            FROM 
                cliente c
            LEFT JOIN tiene t ON c.id_cliente = t.id_cliente
            LEFT JOIN rutina r ON t.id_rutina = r.id_rutina
            LEFT JOIN contiene ct ON r.id_rutina = ct.id_rutina
            LEFT JOIN compone ce ON ct.id_circuito = ce.id_circuito
            LEFT JOIN ejercicio e ON ce.id_ejercicio = e.id_ejercicio
            WHERE
                c.id_cliente = ?
        `;
        const result = await db.execute({
            sql: query,
            args: [clienteId],
        });
        return result.rows;
    }
}

export default Cliente;
