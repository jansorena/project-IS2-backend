import db from "../config/db.js"

class Evaluacion {
    static async create(id_evaluacion, peso, estatura, grasa, masa_muscular, agua, masa_osea, edad, experencia,
                        id_entrenador, fecha_evaluacion, id_cliente){
                            
                            const result = await db.batch([
                                `INSERT INTO evaluacion (id_evaluacion, peso, estatura, grasa, masa_muscular, agua, masa_osea, edad, experencia) VALUES 
                                (${id_evaluacion}, ${peso}, ${estatura}, ${grasa}, ${masa_muscular}, ${agua}, ${masa_osea}, ${edad}, '${experencia}')`,
                                `INSERT INTO posee (id_evaluacion, id_cliente) VALUES (${id_evaluacion}, ${id_cliente})`,
                                `INSERT INTO realiza (id_entrenador, fecha_evaluacion) VALUES (${id_entrenador}, '${fecha_evaluacion}')`,                    

                            ],"write");

                            return result.rows;
                        }
}

export default Evaluacion;