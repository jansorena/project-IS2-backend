import Rutina from '../models/rutinaModel.js';

export async function createRutina(clasificacion, id_cliente, id_usuario, circuitos){
    const rutina_data = await Rutina.createRutina(clasificacion);
    const id_rutina = rutina_data[0];
    const circuito_data = await Rutina.createCircuito(circuitos);
    //console.log(circuito_data);
    await Rutina.createCrea(id_usuario, id_rutina);
    await Rutina.createTiene(id_rutina, id_cliente);    
    circuito_data.forEach(async (circuito,index) => {
        const id_circuito = circuito_data[index][0];
        await Rutina.createContiene(id_rutina, id_circuito, circuitos[index]);        
    });
    circuitos.forEach(async (circuito, index) => {
        const id_circuito = circuito_data[index][0];
        circuito.ejercicios.forEach(async ejercicio => {
            await Rutina.createCompone(id_circuito, ejercicio.id_ejercicio, ejercicio.series, ejercicio.frecuencia, ejercicio.orden, ejercicio.descanso);
        });
    });
    return circuito_data;
}