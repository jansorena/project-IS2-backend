import CustomRouter from './CustomRouter.js';
import * as authController from '../controllers/authController.js';
import passport from 'passport';

class AuthRouter extends CustomRouter {
    init() {
        this.get("/logout", ['AUTHENTICATED'], authController.logout);
        this.get("/profile", ['AUTHENTICATED'], authController.getProfile);
        this.post("/api/login", ['PUBLIC'], passport.authenticate("login", { session: false, failureRedirect: "/auth/login" }), authController.login);
    }
}

export default new AuthRouter().getRouter();
