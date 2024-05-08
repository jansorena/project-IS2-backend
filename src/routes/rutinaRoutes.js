import CustomRouter from './CustomRouter.js';
import * as rutinaController from '../controllers/rutinaController.js';

class rutinaRouter extends CustomRouter {
    init() {
        this.get('/createRutina', ['PUBLIC'], rutinaController.showCreateRutinaForm);

        this.post('/api/createRutina', ['PUBLIC'], rutinaController.createRutina);
    }
}

export default new rutinaRouter().getRouter();