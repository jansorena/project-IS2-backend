import CustomRouter from './CustomRouter.js';
import * as evaluacionController from '../controllers/evaluacionController.js';

class evaluacionRouter extends CustomRouter {
    init() {
        this.post('/api/createEvaluacion', ['PUBLIC'], evaluacionController.createEvalucion);
    }
}

export default new evaluacionRouter().getRouter();