import Rutina from '../models/rutinaModel.js';

export async function createRutina(id_rutina,clasificacion, id_cliente, id_entrenador, fecha_rutina, ejercicios){
    console.log(id_rutina);
    return await Rutina.create(id_rutina,clasificacion, id_cliente, id_entrenador, fecha_rutina, ejercicios)
}