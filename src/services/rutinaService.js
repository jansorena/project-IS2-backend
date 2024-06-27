import Rutina from '../models/rutinaModel.js';

export async function createRutina(clasificacion, id_cliente, id_usuario, circuitos){
    const rutina_data = await Rutina.createRutina(clasificacion);
    const id_rutina = rutina_data.id_rutina;
    
    // Insertar los circuitos asociados a la rutina
    const circuito_data = await Rutina.createCircuito(circuitos);

    // Asignar la rutina al usuario y cliente
    await Rutina.createCrea(id_usuario, id_rutina);
    await Rutina.createTiene(id_rutina, id_cliente);
    
    // Estructura para almacenar el JSON resultante
    const result = {
        id_rutina,
        clasificacion,
        id_cliente,
        id_usuario: id_usuario, 
        circuitos: []
    };
    
    // Iterar sobre los circuitos y asociar ejercicios
    for (let index = 0; index < circuito_data.length; index++) {
        const circuito = circuito_data[index];
        const id_circuito = circuito.id_circuito;
        const descanso = circuitos[index].descanso; // Capturar el descanso del circuito original

        // Crear la relación contiene
        await Rutina.createContiene(id_rutina, id_circuito, circuitos[index]);

        // Estructura del circuito
        const circuitoResult = {
            id_circuito,
            repeticiones: circuito.repeticiones,
            observaciones: circuito.observaciones,
            descanso, // Agregar el descanso al circuito
            ejercicios: []
        };

        // Insertar los ejercicios asociados al circuito
        const ejerciciosPromises = circuitos[index].ejercicios.map(async ejercicio => {
            const ejercicioData = await Rutina.createCompone(id_circuito, ejercicio.id_ejercicio, ejercicio.series, ejercicio.frecuencia, ejercicio.orden, ejercicio.descanso);
            return ejercicioData;
        });

        const ejerciciosData = await Promise.all(ejerciciosPromises);
        circuitoResult.ejercicios = ejerciciosData;

        result.circuitos.push(circuitoResult);
    }

    return result;
}

export async function editRutina(id_rutina, clasificacion, id_cliente, id_usuario, circuitos){
    
    if(clasificacion){
       const rutina_data = await Rutina.editRutina(id_rutina, clasificacion);
    }
    // editar los circuitos asociados a la rutina
    const circuito_data = await Rutina.editCircuito(circuitos);
    
    // Estructura para almacenar el JSON resultante
    const result = {
        id_rutina,
        clasificacion,
        id_cliente,
        id_usuario: id_usuario, 
        circuitos: []
    };
    
    // Iterar sobre los circuitos y editar contiene y compone
    for (let index = 0; index < circuito_data.length; index++) {
        const circuito = circuito_data[index];
        const id_circuito = circuito.id_circuito;
        const descanso = circuitos[index].descanso; // Capturar el descanso del circuito original

        // Crear la relación contiene
        await Rutina.editContiene(id_rutina, id_circuito, circuitos[index]);

        // Estructura del circuito
        const circuitoResult = {
            id_circuito,
            repeticiones: circuito.repeticiones,
            observaciones: circuito.observaciones,
            descanso, // Agregar el descanso al circuito
            ejercicios: []
        };

        // Insertar los ejercicios asociados al circuito
        const ejerciciosPromises = circuitos[index].ejercicios.map(async ejercicio => {
            const ejercicioData = await Rutina.editCompone(id_circuito, ejercicio.id_ejercicio, ejercicio.series, ejercicio.frecuencia, ejercicio.orden, ejercicio.descanso);
            return ejercicioData;
        });

        const ejerciciosData = await Promise.all(ejerciciosPromises);
        circuitoResult.ejercicios = ejerciciosData;

        result.circuitos.push(circuitoResult);
    }

    return result;
}

export async function getEjercicios_id(){
    return await Rutina.getEjercicios_id();
}

export async function getClientes_id(){
    return await Rutina.getClientes_id();
}

export async function getRutinas(id_rutina){
    return await Rutina.getRutinas(id_rutina);
}

export async function getRutinasActivas(){
    return await Rutina.getRutinasActivas();
}

export async function actualizarRutina(rutinaData){
    return await Rutina.actualizarRutina(rutinaData);
}