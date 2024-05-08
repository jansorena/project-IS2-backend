import Evaluacion from '../models/evaluacionModel.js';

export async function createEvalucion(id_evaluacion, peso, estatura, grasa, masa_muscular, agua, masa_osea, edad, experencia, id_entrenador, fecha_evaluacion, id_cliente){
    return await Evaluacion.create(id_evaluacion, peso, estatura, grasa, masa_muscular, agua, masa_osea, edad, experencia, id_entrenador, fecha_evaluacion, id_cliente)
}