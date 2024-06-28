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
            if(circuito.observaciones){
                const observaciones = circuito.observaciones;
                const result = await db.execute({
                    sql: "INSERT INTO circuito (repeticiones,observaciones) VALUES (?, ?) RETURNING *",
                    args: [repeticiones, observaciones],
                });
                return result.rows[0];
            }else{
                const result = await db.execute({
                    sql: "INSERT INTO circuito (repeticiones) VALUES (?) RETURNING *",
                    args: [repeticiones],
                });
                return result.rows[0];
            }            
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

    static async editRutina(id_rutina, clasificacion) {
        const result = await db.execute({
            sql: "UPDATE rutina SET clasificacion = ? WHERE id_rutina = ? RETURNING *",
            args: [clasificacion, id_rutina],
        });
        return result.rows[0];
    }

    static async editCircuito(circuitos) {
        const promises = circuitos.map(async (circuito) => {
            const repeticiones = circuito.repeticiones;
            const observaciones = circuito.observaciones;
            const estado = circuito.estado;
            const result = await db.execute({
                sql: "UPDATE circuito SET repeticiones = ?, observaciones = ?, estado = ? WHERE id_circuito = ? RETURNING *",
                args: [repeticiones, observaciones, estado, circuito.id_circuito],
            });
            return result.rows[0];
        });
    
        const results = await Promise.all(promises);
        return results;
    }
    
    static async editContiene(id_rutina, id_circuito, circuito){
        const descanso = circuito.descanso;
        const result = await db.execute({
            sql: "UPDATE contiene SET descanso = ? WHERE id_rutina = ? AND id_circuito = ? RETURNING *",
            args: [descanso, id_rutina, id_circuito],
        });
        return result.rows[0];
    }

    static async editCompone(id_circuito, id_ejercicio, series, frecuencia, orden, descanso){
        const result = await db.execute({
            sql: "UPDATE compone SET series = ?, frecuencia = ?, orden = ?, descanso = ? WHERE id_circuito = ? AND id_ejercicio = ? RETURNING *",
            args: [series, frecuencia, orden, descanso, id_circuito, id_ejercicio],
        });
        return result.rows[0];
    }

    static async getEjercicios_id(){

        try {
    
            const result = await db.execute({
                sql: "SELECT id_ejercicio as value, nombre as label FROM ejercicio",
                args: [],
            });
            console.log('Result:', result);
    
            if (!result || !result.rows) {
                console.error('No se encontraron filas en la consulta a ejercicio.');
                return [];
            }
            return result.rows;
    
        } catch (error) {
            console.error('Error ejecutando getEjercicios_id:', error);
            throw new Error('Error ejecutando getEjercicios_id');
        }
    }
    
    static async getClientes_id(){
    
        try {
    
            const result = await db.execute({
                sql: "SELECT id_cliente as value, CONCAT(nombre, ' ', apellido) as label FROM cliente",
                args: [],
            });
            console.log('Result:', result);
    
            if (!result || !result.rows) {
                console.error('No se encontraron filas en la consulta a cliente.');
                return [];
            }
            return result.rows;
    
        } catch (error) {
            console.error('Error ejecutando getClientes_id:', error);
            throw new Error('Error ejecutando getClientes_id');
        }
    }
    
    static async getRutinas(id_rutina) {
        try {
            // Obtener información de la rutina junto con todos los datos del cliente y los datos del entrenador
            const rutinaResult = await db.execute({
                sql: `
                    SELECT r.*, 
                           c.id_cliente, c.rut AS rut_cliente, c.nombre AS nombre_cliente, c.apellido AS apellido_cliente, 
                           c.email AS email_cliente, c.fecha_nacimiento AS fecha_nacimiento_cliente, c.suscripcion AS suscripcion_cliente, 
                           c.telefono AS telefono_cliente, c.foto AS foto_cliente, 
                           u.id_usuario AS id_entrenador, u.nombre AS nombre_entrenador, u.apellido AS apellido_entrenador, 
                           u.email AS email_entrenador, u.telefono AS telefono_entrenador, u.especialidad AS especialidad_entrenador, u.foto AS foto_entrenador
                    FROM rutina r
                    INNER JOIN tiene t ON r.id_rutina = t.id_rutina
                    INNER JOIN cliente c ON t.id_cliente = c.id_cliente
                    LEFT JOIN crea cr ON r.id_rutina = cr.id_rutina
                    LEFT JOIN usuario u ON cr.id_entrenador = u.id_usuario
                    WHERE r.id_rutina = ?`,
                args: [id_rutina],
            });
    
            if (!rutinaResult.rows.length) {
                throw new Error('Rutina no encontrada');
            }
            const rutina = rutinaResult.rows[0];
    
            // Obtener los circuitos de la rutina
            const circuitosResult = await db.execute({
                sql: "SELECT c.*, rc.descanso FROM circuito c INNER JOIN contiene rc ON c.id_circuito = rc.id_circuito WHERE rc.id_rutina = ?",
                args: [id_rutina],
            });
            const circuitos = circuitosResult.rows;
    
            // Obtener los ejercicios de cada circuito
            for (let circuito of circuitos) {
                const ejerciciosResult = await db.execute({
                    sql: "SELECT e.*, ce.series, ce.frecuencia, ce.orden, ce.descanso FROM ejercicio e INNER JOIN compone ce ON e.id_ejercicio = ce.id_ejercicio WHERE ce.id_circuito = ?",
                    args: [circuito.id_circuito],
                });
                circuito.ejercicios = ejerciciosResult.rows;
            }
    
            // Ensamblar y retornar los datos
            rutina.circuitos = circuitos;
            return {
                id_rutina: rutina.id_rutina,
                clasificacion: rutina.clasificacion,
                estado: rutina.estado,
                cliente: {
                    id_cliente: rutina.id_cliente,
                    rut: rutina.rut_cliente,
                    nombre: rutina.nombre_cliente,
                    apellido: rutina.apellido_cliente,
                    email: rutina.email_cliente,
                    fecha_nacimiento: rutina.fecha_nacimiento_cliente,
                    suscripcion: rutina.suscripcion_cliente,
                    telefono: rutina.telefono_cliente,
                    foto: rutina.foto_cliente,
                },
                entrenador: {
                    id_entrenador: rutina.id_entrenador,
                    nombre: rutina.nombre_entrenador,
                    apellido: rutina.apellido_entrenador,
                    email: rutina.email_entrenador,
                    telefono: rutina.telefono_entrenador,
                    especialidad: rutina.especialidad_entrenador,
                    foto: rutina.foto_entrenador,
                },
                circuitos: circuitos,
            };
        } catch (error) {
            console.error('Error obteniendo la rutina:', error);
            throw new Error('Error obteniendo la rutina');
        }
    }

    static async getRutinasActivas() {
        try {
            // Obtener todas las rutinas activas
            const rutinasResult = await db.execute({
                sql: `
                    SELECT r.*, 
                           c.id_cliente, c.rut AS rut_cliente, c.nombre AS nombre_cliente, c.apellido AS apellido_cliente, 
                           c.email AS email_cliente, c.fecha_nacimiento AS fecha_nacimiento_cliente, c.suscripcion AS suscripcion_cliente, 
                           c.telefono AS telefono_cliente, c.foto AS foto_cliente, 
                           u.id_usuario AS id_entrenador, u.nombre AS nombre_entrenador, u.apellido AS apellido_entrenador, 
                           u.email AS email_entrenador, u.telefono AS telefono_entrenador, u.especialidad AS especialidad_entrenador, u.foto AS foto_entrenador
                    FROM rutina r
                    INNER JOIN tiene t ON r.id_rutina = t.id_rutina
                    INNER JOIN cliente c ON t.id_cliente = c.id_cliente
                    LEFT JOIN crea cr ON r.id_rutina = cr.id_rutina
                    LEFT JOIN usuario u ON cr.id_entrenador = u.id_usuario
                    WHERE r.estado = 0`,
                args: []
            });
    
            if (!rutinasResult.rows.length) {
                throw new Error('No se encontraron rutinas activas.');
            }
    
            // Recorrer cada rutina para obtener sus circuitos y ejercicios
            for (const rutina of rutinasResult.rows) {
                // Obtener los circuitos de la rutina
                const circuitosResult = await db.execute({
                    sql: "SELECT c.*, rc.descanso FROM circuito c INNER JOIN contiene rc ON c.id_circuito = rc.id_circuito WHERE rc.id_rutina = ?",
                    args: [rutina.id_rutina],
                });
    
                // Obtener los ejercicios de cada circuito
                for (let circuito of circuitosResult.rows) {
                    const ejerciciosResult = await db.execute({
                        sql: "SELECT e.*, ce.series, ce.frecuencia, ce.orden, ce.descanso FROM ejercicio e INNER JOIN compone ce ON e.id_ejercicio = ce.id_ejercicio WHERE ce.id_circuito = ?",
                        args: [circuito.id_circuito],
                    });
                    circuito.ejercicios = ejerciciosResult.rows;
                }
    
                // Asignar los circuitos a la rutina
                rutina.circuitos = circuitosResult.rows;
            }
    
            // Devolver todas las rutinas con su estructura completa
            return rutinasResult.rows.map(rutina => ({
                id_rutina: rutina.id_rutina,
                clasificacion: rutina.clasificacion,
                estado: rutina.estado,
                cliente: {
                    id_cliente: rutina.id_cliente,
                    rut: rutina.rut_cliente,
                    nombre: rutina.nombre_cliente,
                    apellido: rutina.apellido_cliente,
                    email: rutina.email_cliente,
                    fecha_nacimiento: rutina.fecha_nacimiento_cliente,
                    suscripcion: rutina.suscripcion_cliente,
                    telefono: rutina.telefono_cliente,
                    foto: rutina.foto_cliente,
                },
                entrenador: {
                    id_entrenador: rutina.id_entrenador,
                    nombre: rutina.nombre_entrenador,
                    apellido: rutina.apellido_entrenador,
                    email: rutina.email_entrenador,
                    telefono: rutina.telefono_entrenador,
                    especialidad: rutina.especialidad_entrenador,
                    foto: rutina.foto_entrenador,
                },
                circuitos: rutina.circuitos,
            }));
        } catch (error) {
            console.error('Error obteniendo las rutinas activas:', error);
            throw new Error('Error obteniendo las rutinas activas');
        }
    }

    static async actualizarRutina(rutinaData) {
        try {
            console.log('Actualizando rutina:', rutinaData);
            // Actualizar el estado de la rutina
            await db.execute({
                sql: "UPDATE rutina SET estado = ? WHERE id_rutina = ?",
                args: [rutinaData.estado, rutinaData.id_rutina],
            });
    
            // Actualizar los circuitos asociados a la rutina
            for (const circuito of rutinaData.circuitos) {
                await db.execute({
                    sql: "UPDATE circuito SET estado = ?, observaciones = ? WHERE id_circuito = ?",
                    args: [circuito.estado, circuito.observaciones, circuito.id_circuito],
                });
            }
    
            console.log("Datos actualizados correctamente");
    
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
            throw new Error('Error al actualizar los datos');
        }
    }

    static async obtenerRutinasYtotalCircuitos(idCliente) {
        try {
            // Obtener las rutinas del cliente
            const resultRutinas = await db.execute({
                sql: `
                    SELECT 
                        r.id_rutina, 
                        r.clasificacion, 
                        r.estado AS rutina_estado,
                        cr.fecha_rutina
                    FROM 
                        rutina r
                    JOIN 
                        tiene t ON r.id_rutina = t.id_rutina
                    LEFT JOIN 
                        crea cr ON r.id_rutina = cr.id_rutina
                    WHERE 
                        t.id_cliente = ?
                `,
                args: [idCliente],
            });

            const rutinas = resultRutinas.rows;

            const rutinasConCircuitos = await Promise.all(rutinas.map(async (rutina) => {
                // Obtener los circuitos con estado 0
                const resultCircuitosEstado0 = await db.execute({
                    sql: `
                        SELECT 
                            COUNT(*) as count
                        FROM 
                            circuito c
                        JOIN 
                            contiene rc ON c.id_circuito = rc.id_circuito
                        WHERE 
                            rc.id_rutina = ? AND c.estado = 0
                    `,
                    args: [rutina.id_rutina],
                });
                const circuitosEstado0 = resultCircuitosEstado0.rows[0].count;

                // Obtener los circuitos con estado 1
                const resultCircuitosEstado1 = await db.execute({
                    sql: `
                        SELECT 
                            COUNT(*) as count
                        FROM 
                            circuito c
                        JOIN 
                            contiene rc ON c.id_circuito = rc.id_circuito
                        WHERE 
                            rc.id_rutina = ? AND c.estado = 1
                    `,
                    args: [rutina.id_rutina],
                });
                const circuitosEstado1 = resultCircuitosEstado1.rows[0].count;

                return {
                    id_rutina: rutina.id_rutina,
                    clasificacion: rutina.clasificacion,
                    rutina_estado: rutina.rutina_estado,
                    fecha_rutina: rutina.fecha_rutina,
                    circuitos_estado_0: circuitosEstado0,
                    circuitos_estado_1: circuitosEstado1
                };
            }));

            return rutinasConCircuitos;
        } catch (error) {
            console.error('Error al obtener rutinas y circuitos:', error);
            throw new Error('Error al obtener rutinas y circuitos');
        }
    }
}



export default Rutina;