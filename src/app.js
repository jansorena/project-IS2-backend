import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from "passport";
import initPassport from "./config/passport.config.js";
import authRoutes from './routes/authRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import rutinaRoutes from './routes/rutinaRoutes.js';
import evaluacionRoutes from './routes/evaluacionRoutes.js';

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Passport 
app.use(passport.initialize());
initPassport();

// Routes
app.get('/', (req, res) => {
    res.send('Backend para la app de Gimnasio');
});
app.use('/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/rutina', rutinaRoutes);
app.use('/evaluacion', evaluacionRoutes);


