import * as rutinaService from '../services/rutinaService.js';

export const createRutina = async (req, res) => {
    try {
        const rutina = await rutinaService.createRutina(req.body.id_rutina, req.body.clasificacion,
                    req.body.rut, req.body.rut_entrenador, req.body.fecha_rutina, req.body.ejercicios);
        res.status(200).json(rutina);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
}