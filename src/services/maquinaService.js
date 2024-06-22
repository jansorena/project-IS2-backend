import Maquina from '../models/maquinaModel.js';

export async function getAllmaquinas() {
    const maquinas = await Maquina.getAllmaquinas();
    if(!maquinas || maquinas.length === 0) {
        return [];
    }

    return maquinas
}

export async function UpdateMaquina(id_maquina, estado) {
    return await Maquina.UpdateMaquina(id_maquina, estado);
}