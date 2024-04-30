import CustomRouter from './CustomRouter.js';
import { getAllClientes } from '../controllers/clienteController.js';

class ClientRouter extends CustomRouter {
    init() {
        this.get('/', ['PUBLIC'], getAllClientes);
    }
}

export default new ClientRouter().getRouter();