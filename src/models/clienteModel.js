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
}

export default Cliente;
