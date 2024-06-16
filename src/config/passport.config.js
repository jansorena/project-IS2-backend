import passport from 'passport';
import { comparePassword } from '../utils/passwordUtils.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { getUserByEmail, getUserById } from '../services/usuarioService.js';

const JWT_SECRET = process.env.PRIVATE_KEY;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['token'];
        }
        return token;
    }]),
    secretOrKey: JWT_SECRET
};

const initPassport = () => {
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await getUserByEmail(email);
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            const userId = Number(jwtPayload.id);
            if (!Number.isFinite(userId)) {
                throw new Error("Invalid user ID in JWT payload");
            }
            const user = await getUserById(userId);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
};

export default initPassport;
