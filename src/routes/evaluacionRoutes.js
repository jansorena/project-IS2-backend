import CustomRouter from './CustomRouter.js';
import { createEvalucion } from '../controllers/evaluacionController.js';

class evaluacionRouter extends CustomRouter{
    init() {
        this.post('/createEvaluacion', ['PUBLIC'], createEvalucion);
    }
}

export default new evaluacionRouter().getRouter();