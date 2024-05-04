import db from "../config/db.js";

class Rutina {
    static async create(id_rutina,clasificacion, rut, rut_entrenador, fecha_rutina, ejercicios){
        
        const resultRutina = await db.execute(`INSERT INTO rutina (id_rutina, clasificacion) VALUES (${id_rutina}, '${clasificacion}')`);
        const resultCrea = await db.execute(`INSERT INTO crea (rut_entrenador, id_rutina, fecha_rutina) VALUES ( '${rut_entrenador}', ${id_rutina}, ${id_rutina})`);
        const resultTiene = await db.execute(`INSERT INTO tiene (id_rutina, rut) VALUES (${id_rutina} ,'${rut}')`);
        
        
        let query = 'INSERT INTO contiene (id_rutina, id_ejercicio, repeticiones, series, secuencia) VALUES ';
        ejercicios.forEach((ejercicio,index) => {
            query += `(${id_rutina}, ${ejercicio[0]}, ${ejercicio[1]}, ${ejercicio[2]}, ${ejercicio[3]})`;
            if (index < ejercicios.length - 1) {
                query += ', ';
            }

        });
      
        const resultEjercicios = await db.execute(query);
        
        return resultRutina.rows, resultCrea.rows, resultTiene.rows, resultEjercicios.rows;
        
    }
}

export default Rutina;