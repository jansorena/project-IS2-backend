import * as evaluacionService from '../services/evaluacionService.js';

export const createEvalucion = async (req, res) => {
    try {
        const evaluacion = await evaluacionService.createEvalucion(req.body.id_evaluacion, req.body.peso, req.body.estatura, req.body.grasa, req.body.masa_muscular, req.body.agua, req.body.masa_osea, req.body.agua, req.body.edad, req.body.experencia, req.body.id_entrenador, req.body.fecha_evaluacion, req.body.id_cliente)
        res.status(200).json(evaluacion);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ error: error.message });
    }
}