import CustomRouter from './CustomRouter.js';
import * as rutinaController from '../controllers/rutinaController.js';

class rutinaRouter extends CustomRouter {
    init() {
        this.post('/api', ['PUBLIC'], rutinaController.createRutina);
        this.get('/api', ['PUBLIC'], rutinaController.getData)
    }
}

export default new rutinaRouter().getRouter();