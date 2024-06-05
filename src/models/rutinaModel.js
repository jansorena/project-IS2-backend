import db from "../config/db.js";

class Rutina {

    static async getEjercicios_id(){

        try {

            const resultEjercicio = await db.execute({
                sql: "SELECT id_ejercicio as value, nombre as label FROM ejercicio",
                args: [],
            });
            console.log('ResultEjercicio:', resultEjercicio);
            // Verificar que result.rows no sea undefined o null
            if (!resultEjercicio || !resultEjercicio.rows) {
                console.error('No se encontraron filas en la consulta a ejercicio.');
                return [];  // Retorna un arreglo vacío si no hay resultados en ejercicio
            }
            return resultEjercicio.rows;

        } catch (error) {
            console.error('Error ejecutando getData_Id:', error);
            throw new Error('Error ejecutando getData_Id');
        }
    }

    static async create(id_rutina, clasificacion, id_cliente, id_usuario, fecha_rutina, circuitos){
        let queryCircuito = 'INSERT INTO circuito (id_circuito, repeticiones) VALUES ';
        let queryContiene = 'INSERT INTO contiene (id_rutina, id_circuito, descanso) VALUES ';
        circuitos.forEach((circuito,index) => {
            queryCircuito += `(${circuito.id_circuito}, ${circuito.repeticiones})`;
            if(circuito.descanso)
                queryContiene += `(${id_rutina}, ${circuito.id_circuito}, '${circuito.descanso}')`;
            else
                queryContiene += `(${id_rutina}, ${circuito.id_circuito}, "N/A")`;
            if (index < circuitos.length - 1) {
                queryCircuito += ', ';
                queryContiene += ', ';
            }
        });
        
        let queryCompone = 'INSERT INTO compone (id_circuito, id_ejercicio, series, frecuencia, orden, descanso) VALUES ';
        circuitos.forEach((circuito, index) => {
            circuito.ejercicios.forEach((ejercicio, ejercicioIndex) => {
                queryCompone += `(${circuito.id_circuito}, ${ejercicio.id_ejercicio}, ${ejercicio.series}, '${ejercicio.frecuencia}', ${ejercicio.orden}, '${ejercicio.descan}')`;
                if (ejercicioIndex < circuito.ejercicios.length - 1) {
                    queryCompone += ', ';
                }
            });
            if (index < circuitos.length - 1) {
                queryCompone += ', ';
            }
        });

        const result = await db.batch([
            `INSERT INTO rutina (id_rutina, clasificacion) VALUES (${id_rutina}, '${clasificacion}')`,
            `INSERT INTO crea (id_entrenador, id_rutina, fecha_rutina) VALUES (${id_usuario}, ${id_rutina}, '${fecha_rutina}')`,
            `INSERT INTO tiene (id_rutina, id_cliente) VALUES (${id_rutina} ,${id_cliente})`,
            queryCircuito,
            queryContiene,
            queryCompone,
        ],"write")
        
        return result.rows;
        
    }
}

export default Rutina;