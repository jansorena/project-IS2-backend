import * as rutinaService from '../services/rutinaService.js';

export const createRutina = async (req, res) => {
    try {
        const {id_rutina, clasificacion, id_cliente, id_entrenador, fecha_rutina, ejercicios} = req.body;
        const rutina = await rutinaService.createRutina(id_rutina, clasificacion, id_cliente, id_entrenador, fecha_rutina, ejercicios);
        res.status(200).json(rutina);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
}

export const showCreateRutinaForm = (req, res) => {
    res.render('createRutina', { title: 'Create Rutina Page'});
}