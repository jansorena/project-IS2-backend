import passport from 'passport';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { getUserByEmail, getUserById } from '../services/userService.js';

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
                console.log('User not found');
                return done(null, false, { message: 'User not found' });
            }
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                console.log('Incorrect password');
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        } catch (error) {
            console.error('Error in local strategy:', error);
            return done(error);
        }
    }));

    passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
        try {
            const user = await getUserById(jwtPayload.id);
            if (!user) {
                console.log('User not found in JWT strategy');
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            console.error('Error in JWT strategy:', error);
            return done(error);
        }
    }));
};

export default initPassport;
