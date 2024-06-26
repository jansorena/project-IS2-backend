import * as maquinaService from '../services/maquinaService.js';

export const getAllmaquinas = async (req,res) => {
    try {
        const maquinas = await maquinaService.getAllmaquinas();
        res.status(200).json(maquinas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const UpdateMaquina = async (req,res) => {
    try {

        const id_maquina = req.body.id_maquina;
        const estado = req.body.estado;
        const reporte = req.body.reporte;
        const descripcion = req.body.descripcion;
        const maquina = await maquinaService.UpdateMaquina(id_maquina, estado, reporte, descripcion);
        res.status(200).json(maquina);
    } catch (error) {   
        console.error('Error:', error);
        res.status(500).json({ error: error.message});
    }
};