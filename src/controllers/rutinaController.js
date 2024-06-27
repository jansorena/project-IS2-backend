import * as rutinaService from '../services/rutinaService.js';

export const createRutina = async (req, res) => {
    try {
        const { clasificacion, id_cliente, id_usuario, circuitos } = req.body;
        const rutina = await rutinaService.createRutina(clasificacion, id_cliente, id_usuario, circuitos);
        res.status(200).json(rutina);        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
}

export const editRutina = async (req, res) => {
    try {
        const { id_rutina, clasificacion, id_cliente, id_usuario, circuitos } = req.body;
        const rutina = await rutinaService.editRutina(id_rutina, clasificacion, id_cliente, id_usuario, circuitos);
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

export const getRutinas = async (req, res) => {
    try {
        const id_rutina = req.params.id_rutina;
        console.log(req);
        const rutinas = await rutinaService.getRutinas(id_rutina);
        res.status(200).json(rutinas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
}

export const getRutinasActivas = async (req, res) => {
    try {
        const rutinas = await rutinaService.getRutinasActivas();
        res.status(200).json(rutinas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
}

export const actualizarRutina = async (req, res) => {
    try {
        const rutinaData = req.body;
        const rutina = await rutinaService.actualizarRutina(rutinaData);
        res.status(200).json(rutina);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
}