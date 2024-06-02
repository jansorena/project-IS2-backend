import CustomRouter from './CustomRouter.js';
import * as authController from '../controllers/authController.js';
import passport from 'passport';

class AuthRouter extends CustomRouter {
    init() {
        this.get("/logout", ['AUTHENTICATED'], authController.logout);
        this.get("/profile", ['AUTHENTICATED'], authController.getProfile);
        this.post("/login", ['PUBLIC'], passport.authenticate("login", { session: false }), authController.login);
        this.post("/register", ['PUBLIC'], authController.register);
    }
}

export default new AuthRouter().getRouter();
