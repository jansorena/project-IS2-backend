import CustomRouter from './CustomRouter.js';
import { createRutina } from '../controllers/rutinaController.js';

class rutinaRouter extends CustomRouter {
    init() {
        this.post('/createRutina', ['PUBLIC'], createRutina);
    }
}

export default new rutinaRouter().getRouter();