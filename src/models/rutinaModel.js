import db from "../config/db.js";

class Rutina {
    static async create(id_rutina,clasificacion, id_cliente, id_entrenador, fecha_rutina, ejercicios){
        
        let query = 'INSERT INTO contiene (id_rutina, id_ejercicio, repeticiones, series, secuencia) VALUES ';
        ejercicios.forEach((ejercicio,index) => {
            query += `(${id_rutina}, ${ejercicio[0]}, ${ejercicio[1]}, ${ejercicio[2]}, ${ejercicio[3]})`;
            if (index < ejercicios.length - 1) {
                query += ', ';
            }

        });
      

        const result = await db.batch([
            `INSERT INTO rutina (id_rutina, clasificacion) VALUES (${id_rutina}, '${clasificacion}')`,
            `INSERT INTO crea (id_entrenador, id_rutina, fecha_rutina) VALUES (${id_entrenador}, ${id_rutina}, '${fecha_rutina}')`,
            `INSERT INTO tiene (id_rutina, id_cliente) VALUES (${id_rutina} ,${id_cliente})`,
            query,
        ],"write")
        
        return result.rows;
        
    }
}

export default Rutina;