import db from "../config/db.js";

class Maquina {

    static async getAllmaquinas(){
        try {
                const result = await db.execute({
                    sql: `
                    SELECT
                    m.id_maquina,
                    m.nombre AS nombre_maquina,
                    m.estado,
                    e.nombre AS nombre_ejercicio
                    FROM
                        maquina m
                    LEFT JOIN
                        utiliza u ON m.id_maquina = u.id_maquina
                    LEFT JOIN
                        ejercicio e ON u.id_ejercicio = e.id_ejercicio;
                    `,
                    args: [],
                });
                console.log('Result:', result);
                if(!result || !result.rows) {
                    console.error('No se encontraron filas en la consulta');
                    return [];
                }
                const maquinas = {};

                result.rows.forEach(row => {
                    const { id_maquina, nombre_maquina, estado, id_ejercicio, nombre_ejercicio } = row;
                    
                    if (!maquinas[id_maquina]) {
                    maquinas[id_maquina] = {
                        id_maquina,
                        nombre_maquina,
                        estado,
                        ejercicios: []
                    };
                    
                    }

                    if (row.nombre_ejercicio) {
                    maquinas[id_maquina].ejercicios.push({
                        id_ejercicio,
                        nombre_ejercicio
     
                    });
                    }
                });

                return Object.values(maquinas);

        } catch (error) {
            console.error('Error ejecutando getAllmaquinas:', error);
            throw new Error('Error ejecutando getAllmaquinas');
        }
    }

    static async UpdateMaquina(id_maquina, estado){
        try {
            const result = await db.execute({
                sql: "UPDATE maquina SET estado = ? WHERE id_maquina = ?",
                args: [estado,id_maquina],
            });

            return result;
        } catch (error) {
            console.error('Error ejecutando UpdateMaquina:', error);
            throw new Error('Error ejecutando UpdateMaquina');
        }

        
    }
}

export default Maquina;