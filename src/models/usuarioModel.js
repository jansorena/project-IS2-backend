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
        const result = await db.execute({
            sql: "SELECT * FROM usuario WHERE id_usuario = ?",
            args: [usuarioId],

        });
        return result.rows[0];
    }

    static async create(usuarioData) {
        const { email, password, nombre, apellido, role, especialidad } = usuarioData;
        const result = await db.execute({
            sql: "INSERT INTO usuario (email, password, nombre, apellido, role, especialidad) VALUES (?, ?, ?, ?, ?, ?) RETURNING *",
            args: [email, password, nombre, apellido, role, especialidad],

        });
        return result.rows[0];
    }
}

export default Usuario;
