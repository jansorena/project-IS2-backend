import db from "../config/db.js";

class Usuario {
    static async findByEmail(email) {
        const result = await db.execute({
            sql: "SELECT * FROM usuario WHERE email = ?",
            args: [email],
        });
        return result.rows[0];
    }

    static async findById(usuarioId) {
        // Convertir a número para asegurarse de que es finito
        const id = Number(usuarioId);
        if (!Number.isFinite(id)) {
            throw new Error("Invalid user ID");
        }
        const result = await db.execute({
            sql: "SELECT * FROM usuario WHERE id_usuario = ?",
            args: [id],
        });
        return result.rows[0];
    }


    static async create(usuarioData) {
        const { rut, nombre, apellido, email, fecha_nacimiento, telefono, foto, especialidad } = usuarioData;
        const role = "entrenador"
        const result = await db.execute({
            sql: "INSERT INTO usuario (rut, nombre, apellido, email, fecha_nacimiento, telefono, foto, role, especialidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *",
            args: [rut, nombre, apellido, email, fecha_nacimiento, telefono, foto, role, especialidad],
        });
        return result.rows[0];
    }

    static async update(userId, userData) {
        // Crear listas para campos y valores
        const fields = [];
        const values = [];

        // Iterar sobre los datos del usuario y construir la consulta dinámica
        for (const [key, value] of Object.entries(userData)) {
            if (value !== undefined) {
                fields.push(`${key} = ?`);
                values.push(value);
            }
        }

        // Añadir el ID del usuario al final de la lista de valores
        values.push(userId);

        // Construir la consulta SQL
        const sql = `UPDATE usuario SET ${fields.join(', ')} WHERE id_usuario = ? RETURNING *`;

        // Ejecutar la consulta
        const result = await db.execute({
            sql,
            args: values,
        });

        return result.rows[0];
    }




    static async delete(usuarioId) {
        const result = await db.execute({
            sql: "DELETE FROM usuario WHERE id_usuario = ?",
            args: [usuarioId],
        });
        return result.rows[0];
    }

    static async findAll() {
        try {
            const result = await db.execute({
                sql: "SELECT * FROM usuario",
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
}

export default Usuario;
