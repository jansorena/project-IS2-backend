import CustomRouter from './CustomRouter.js';
import { getAllClientes, getRutinasByClienteId, getClienteById } from '../controllers/clienteController.js';

class ClientRouter extends CustomRouter {
    init() {
        this.get('/', ['PUBLIC'], getAllClientes);
        this.get('/:clienteId/rutinas', ['PUBLIC'], getRutinasByClienteId);
        this.get('/:clienteId', ['PUBLIC'], getClienteById);
    }
}

export default new ClientRouter().getRouter();