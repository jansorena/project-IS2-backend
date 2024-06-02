import Rutina from '../models/rutinaModel.js';

export async function createRutina(id_rutina, clasificacion, id_cliente, id_usuario, fecha_rutina, circuitos){
    return await Rutina.create(id_rutina, clasificacion, id_cliente, id_usuario, fecha_rutina, circuitos)
}