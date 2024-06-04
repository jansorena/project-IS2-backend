import db from "../config/db.js";

class Rutina {
    static async createRutina(clasificacion){
        const result = await db.execute({
            sql: "INSERT INTO rutina (clasificacion) VALUES (?) RETURNING *",
            args: [clasificacion],
        });
        return result.rows[0];
    }

    static async createCircuito(circuitos) {
        const promises = circuitos.map(async (circuito) => {
            const repeticiones = circuito.repeticiones;
            const result = await db.execute({
                sql: "INSERT INTO circuito (repeticiones) VALUES (?) RETURNING *",
                args: [repeticiones],
            });
            return result.rows[0];
        });
    
        const results = await Promise.all(promises);
        return results;
    }
    
    static async createCrea(id_entrenador, id_rutina){
        const result = await db.execute({
            sql: "INSERT INTO crea (id_entrenador, id_rutina) VALUES (?, ?) RETURNING *",
            args: [id_entrenador, id_rutina],
        });
        return result.rows[0];
    }

    static async createTiene(id_rutina, id_cliente){
        const result = await db.execute({
            sql: "INSERT INTO tiene (id_rutina, id_cliente) VALUES (?, ?) RETURNING *",
            args: [id_rutina, id_cliente],
        });
        return result.rows[0];
    }

    static async createContiene(id_rutina, id_circuito, circuito){
        console.log(circuito.descanso);
        if(circuito.descanso){
            const descanso = circuito.descanso;
            const result = await db.execute({
                sql: "INSERT INTO contiene (id_rutina, id_circuito, descanso) VALUES (?, ?, ?) RETURNING *",
                args: [id_rutina, id_circuito, descanso],
            });
            return result.rows[0];
        }else{
            const result = await db.execute({
                sql: "INSERT INTO contiene (id_rutina, id_circuito) VALUES (?, ?) RETURNING *",
                args: [id_rutina, id_circuito],
            });
            return result.rows[0];
        }        
    }

    static async createCompone(id_circuito, id_ejercicio, series, frecuencia, orden, descanso){
        const result = await db.execute({
            sql: "INSERT INTO compone (id_circuito, id_ejercicio, series, frecuencia, orden, descanso) VALUES (?, ?, ?, ?, ?, ?) RETURNING *",
            args: [id_circuito, id_ejercicio, series, frecuencia, orden, descanso],
        });
        return result.rows[0];
    }    
}

export default Rutina;