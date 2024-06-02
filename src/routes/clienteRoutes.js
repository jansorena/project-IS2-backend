import CustomRouter from './CustomRouter.js';
import { getAllClientes, getRutinasByClienteId, getClienteDetalles, addCliente } from '../controllers/clienteController.js';

class ClientRouter extends CustomRouter {
    init() {
        this.get('/', ['PUBLIC'], getAllClientes);
        this.get('/:clienteId/rutinas', ['PUBLIC'], getRutinasByClienteId);
        this.get('/:clienteId', ['PUBLIC'], getClienteDetalles);
        this.post('/', ['PUBLIC'], addCliente);
    }
}

export default new ClientRouter().getRouter();