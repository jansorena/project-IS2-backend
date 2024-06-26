import CustomRouter from './CustomRouter.js';
import * as rutinaController from '../controllers/rutinaController.js';

class rutinaRouter extends CustomRouter {
    init() {
        this.post('/', ['PUBLIC'], rutinaController.createRutina);
        this.put('/', ['PUBLIC'], rutinaController.editRutina);
        this.get('/', ['PUBLIC'], rutinaController.getData)
        this.get('/activas', ['PUBLIC'], rutinaController.getRutinasActivas)
        this.get('/:id_rutina', ['PUBLIC'], rutinaController.getRutinas)
        this.put('/actualizar', ['PUBLIC'], rutinaController.actualizarRutina)
        this.get('/circuitos/:id_cliente', ['PUBLIC'], rutinaController.obtenerRutinasYtotalCircuitos)
    }
}

export default new rutinaRouter().getRouter();