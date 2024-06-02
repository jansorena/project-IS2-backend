import CustomRouter from './CustomRouter.js';
import { getAllClientes, getRutinasByClienteId, getClienteDetalles, addCliente, updateCliente } from '../controllers/clienteController.js';

class ClientRouter extends CustomRouter {
    init() {
        this.get('/', ['PUBLIC'], getAllClientes);
        this.get('/:clienteId/rutinas', ['PUBLIC'], getRutinasByClienteId);
        this.get('/:clienteId', ['PUBLIC'], getClienteDetalles);
        this.post('/', ['PUBLIC'], addCliente);
        this.put('/:clienteId', ['PUBLIC'], updateCliente); // Nueva ruta PUT
    }
}

export default new ClientRouter().getRouter();