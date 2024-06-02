import * as evaluacionService from '../services/evaluacionService.js';

export const createEvalucion = async (req, res) => {
    try {
        const { id_evaluacion, peso, estatura, grasa, masa_muscular, agua, masa_osea, edad, experiencia, id_entrenador, fecha_evaluacion, id_cliente } = req.body;
        const evaluacion = await evaluacionService.createEvalucion(id_evaluacion, peso, estatura, grasa, masa_muscular, agua, masa_osea, edad, experiencia, id_entrenador, fecha_evaluacion, id_cliente);
        res.status(200).json(evaluacion);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ error: error.message });
    }
};

