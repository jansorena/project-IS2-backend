import db from "../config/db.js";

class Rutina {
    static async create(id_rutina, clasificacion, id_cliente, id_entrenador, fecha_rutina, circuitos, ejercicios){
        let queryCircuito = 'INSERT INTO circuito (id_circuito, repeticiones) VALUES ';
        let queryContiene = 'INSERT INTO contiene (id_rutina, id_circuito, descanso) VALUES ';
        circuitos.forEach((circuito,index) => {
            queryCircuito += `(${circuito[0]}, ${circuito[1]})`;
            queryContiene += `(${id_rutina}, ${circuito[0]}, ${circuito[2]})`;
            if (index < circuitos.length - 1) {
                queryCircuito += ', ';
                queryContiene += ', ';
            }
        });
        
        let queryCompone = 'INSERT INTO compone (id_circuito, id_ejercicio, series, frecuencia, orden, descanso) VALUES ';
        circuitos.forEach((circuito, index) => {
            ejercicios[index].forEach((ejercicio) => {
            queryCompone += `(${circuito[0]}, ${ejercicio[0]}, ${ejercicio[1]}, ${ejercicio[2]}, ${ejercicio[3]}, ${ejercicio[4]})`;
            if (index < circuitos.length - 1) {
                queryCompone += ', ';
            }
            });
        });

        const result = await db.batch([
            `INSERT INTO rutina (id_rutina, clasificacion) VALUES (${id_rutina}, '${clasificacion}')`,
            `INSERT INTO crea (id_entrenador, id_rutina, fecha_rutina) VALUES (${id_entrenador}, ${id_rutina}, '${fecha_rutina}')`,
            `INSERT INTO tiene (id_rutina, id_cliente) VALUES (${id_rutina} ,${id_cliente})`,
            queryCircuito,
            queryContiene,
            queryCompone,
        ],"write")
        
        return result.rows;
        
    }
}

export default Rutina;