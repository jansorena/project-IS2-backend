import CustomRouter from "./CustomRouter.js";
import { getAllmaquinas } from '../controllers/maquinaController.js';

class MaquinaRouter extends CustomRouter{
    init(){
        this.get('/', ['PUBLIC'], getAllmaquinas);
    }
}

export default new MaquinaRouter().getRouter();