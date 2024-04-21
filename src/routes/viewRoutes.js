import CustomRouter from './CustomRouter.js';
import { renderHomePage, renderContact } from '../controllers/viewHandlers.js';

class ViewRouter extends CustomRouter {
    init() {
        this.get('/', ['AUTHENTICATED'], renderHomePage);
        this.get('/contact', ['AUTHENTICATED'], renderContact);
    }
}

export default new ViewRouter().getRouter();
