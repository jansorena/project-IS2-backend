import db from "../config/db.js";

class Cliente {
    static async findAll() {
        try {
            const result = await db.execute({
                sql: "SELECT * FROM cliente",
                args: [],
            });
            console.log('Result:', result);
            if (!result || !result.rows) {
                console.error('No se encontraron filas en la consulta.');
                return [];
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

    static async updateClienteById(clienteId, clienteData) {
        const { nombre, apellido, email, fecha_nacimiento, suscripcion, telefono } = clienteData;
        console.log(nombre, apellido, email, fecha_nacimiento, suscripcion, telefono, clienteId)
        const result = await db.execute({
            sql: "UPDATE cliente SET nombre = ?, apellido = ?, email = ?, fecha_nacimiento = ?, suscripcion = ?, telefono = ? WHERE id_cliente = ? RETURNING *",
            args: [nombre, apellido, email, fecha_nacimiento, suscripcion, telefono, clienteId],
        });
        return result.rows[0];
    }

    static async findRutinasByClienteId(clienteId) {
        const result = await db.execute({
            sql: `
                SELECT r.*, c.fecha_rutina 
                FROM rutina r
                JOIN tiene t ON r.id_rutina = t.id_rutina
                JOIN crea c ON r.id_rutina = c.id_rutina
                WHERE t.id_cliente = ?
            `,
            args: [clienteId],
        });
        return result.rows;
    }

    static async findCircuitosByRutinaId(rutinaId) {
        const result = await db.execute({
            sql: `
                SELECT c.*, con.descanso 
                FROM circuito c
                JOIN contiene con ON c.id_circuito = con.id_circuito
                WHERE con.id_rutina = ?
            `,
            args: [rutinaId],
        });
        return result.rows;
    }

    static async findEjerciciosByCircuitoId(circuitoId) {
        const result = await db.execute({
            sql: `
                SELECT 
                    e.*, 
                    com.series, 
                    com.frecuencia, 
                    com.orden, 
                    com.descanso 
                FROM ejercicio e
                JOIN compone com ON e.id_ejercicio = com.id_ejercicio
                WHERE com.id_circuito = ?
            `,
            args: [circuitoId],
        });
        return result.rows;
    }

}

export default Cliente;
