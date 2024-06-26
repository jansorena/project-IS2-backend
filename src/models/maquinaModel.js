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
                    m.descripcion,
                    m.reporte

                    FROM maquina AS m
                    `,
                    args: [],
                });
                console.log('Result:', result);
                if(!result || !result.rows) {
                    console.error('No se encontraron filas en la consultas');
                    return [];
                }
  
                return result;

        } catch (error) {
            console.error('Error ejecutando getAllmaquinas:', error);
            throw new Error('Error ejecutando getAllmaquinas');
        }
    }

    static async UpdateMaquina(id_maquina, estado, reporte, descripcion){
        try {
            const result = await db.execute({
                sql: "UPDATE maquina SET estado = ?, reporte = ?, descripcion = ? WHERE id_maquina = ?",
                args: [estado, reporte, descripcion, id_maquina],
            });

            return result;
        } catch (error) {
            console.error('Error ejecutando UpdateMaquina:', error);
            throw new Error('Error ejecutando UpdateMaquina');
        }

        
    }
}

export default Maquina;