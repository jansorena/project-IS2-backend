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