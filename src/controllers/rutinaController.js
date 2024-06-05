import * as rutinaService from '../services/rutinaService.js';

export const createRutina = async (req, res) => {
    try {
        const { id_rutina, clasificacion, id_cliente, id_usuario, fecha_rutina, circuitos } = req.body;
        const rutina = await rutinaService.createRutina(id_rutina, clasificacion, id_cliente, id_usuario, fecha_rutina, circuitos);
        res.status(200).json(rutina);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
}

export const getData= async (req, res) => {
    try {
        const ejercicios = await rutinaService.getEjercicios_id();
        const clientes = await rutinaService.getClientes_id();
        res.status(200).json({clientes ,ejercicios})
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message});
    }
}
