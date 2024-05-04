import CustomRouter from './CustomRouter.js';
import { createRutina } from '../controllers/rutinaController.js';

class Create_rutinaRouter extends CustomRouter {
    init() {
        this.get('/', ['PUBLIC'], createRutina);
    }
}

export default new Create_rutinaRouter().getRouter();