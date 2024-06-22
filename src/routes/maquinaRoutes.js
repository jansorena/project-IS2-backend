import CustomRouter from "./CustomRouter.js";
import { getAllmaquinas, UpdateMaquina } from '../controllers/maquinaController.js';


class MaquinaRouter extends CustomRouter{
    init(){
        this.get('/', ['PUBLIC'], getAllmaquinas);
        this.put('/', ['PUBLIC'], UpdateMaquina);
    }
}

export default new MaquinaRouter().getRouter();