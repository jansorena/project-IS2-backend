import Rutina from '../models/rutinaModel.js';

export async function createRutina(id_rutina, clasificacion, id_cliente, id_entrenador, fecha_rutina, circuitos, ejercicios){
    return await Rutina.create(id_rutina, clasificacion, id_cliente, id_entrenador, fecha_rutina, circuitos, ejercicios)
}