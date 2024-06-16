import CustomRouter from './CustomRouter.js';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
} from '../controllers/usuarioController.js';

class ClientRouter extends CustomRouter {
    init() {
        this.get('/', ['PUBLIC'], getAllUsers);
        this.get('/:userId', ['PUBLIC'], getUserById);
        this.post('/', ['PUBLIC'], createUser);
        this.put('/:userId', ['PUBLIC'], updateUser);
        this.delete('/:userId', ['PUBLIC'], deleteUser);
        this.get('/email/:email', ['PUBLIC'], getUserByEmail);
    }
}

export default new ClientRouter().getRouter();