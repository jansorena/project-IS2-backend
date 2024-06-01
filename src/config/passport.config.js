import passport from 'passport';
import { comparePassword } from '../utils/passwordUtils.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

const JWT_SECRET = process.env.PRIVATE_KEY;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['token']; // Asegurar de reemplazar con el mismo nombre de la cookie que se establece en el controlador
        }
        return token;
    }]),
    secretOrKey: JWT_SECRET
};

const initPassport = () => {
    // passport.use('login', new LocalStrategy({
    //     usernameField: 'email',
    //     passwordField: 'password'
    // }, async (email, password, done) => {
    //     try {
    //         const user = await userService.getUserByEmail(email);
    //         if (!user) {
    //             return done(null, false, { message: 'User not found' });
    //         }

    //         const isMatch = await comparePassword(password, user.password);
    //         if (!isMatch) {
    //             return done(null, false, { message: 'Incorrect password' });
    //         }
    //         return done(null, user);
    //     } catch (error) {
    //         done(error);
    //     }
    // }));


    // passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
    //     try {
    //         const user = await userService.getUserById(jwtPayload.id);
    //         if (!user) {
    //             return done(null, false);
    //         }

    //         return done(null, user);
    //     } catch (error) {
    //         done(error);
    //     }
    // }));
};

export default initPassport;
