import express from 'express';
import __dirname from './utils/pathUtils.js';
import path from "path";
import handlebars from "express-handlebars";
import authRoutes from './routes/authRoutes.js';
import db from "./config/db.js";
import passport from "passport";
import initPassport from "./config/passport.config.js";
import viewRoutes from './routes/viewRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT;

// Database connection
db.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
const publicPath = path.join(__dirname, "../../public");
app.use(express.static(publicPath));

// Template engine - Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, '../views'));
app.engine(
    "hbs",
    handlebars.engine(
        {
            extname: ".hbs",
            defaultLayout: "main.hbs",
            layoutsDir: path.join(__dirname, "../views/layouts"),
        }
    )
);

// Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// Passport 
app.use(passport.initialize());
initPassport();


// Routes
app.use('/', viewRoutes);
app.use('/auth', authRoutes);


