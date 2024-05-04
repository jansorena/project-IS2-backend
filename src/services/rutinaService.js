import Rutina from '../models/rutinaModel.js';

export async function createRutina(id_rutina,clasificacion, rut, rut_entrenador, fecha_rutina, ejercicios){
    return await Rutina.create(id_rutina,clasificacion, rut, rut_entrenador, fecha_rutina, ejercicios)
}