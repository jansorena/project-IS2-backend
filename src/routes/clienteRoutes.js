import CustomRouter from './CustomRouter.js';
import { getAllClientes, getRutinasByClienteId, addCliente, updateCliente, getClienteById } from '../controllers/clienteController.js';

class ClientRouter extends CustomRouter {
    init() {
        this.get('/', ['PUBLIC'], getAllClientes);
        this.get('/:clienteId/rutinas', ['PUBLIC'], getRutinasByClienteId);
        this.get('/:clienteId', ['PUBLIC'], getClienteById);
        this.post('/', ['PUBLIC'], addCliente);
        this.put('/:clienteId', ['PUBLIC'], updateCliente); // Nueva ruta PUT
    }
}

export default new ClientRouter().getRouter();