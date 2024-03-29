import express from "express";
import handlebars from 'express-handlebars' 
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from "passport";
import __dirname from './dirname.js'
import router from './router/index.js'
import config from "./config/index.js";
import initializePassport from "./config/passport.config.js";
import errorHandler from "./middlewares/errorHandler.js";
import addLogger from "./middlewares/logger.middleware.js";

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.use(addLogger)

app.engine("handlebars", handlebars.engine())
app.set('views', __dirname + "/views")
app.set("view engine", "handlebars")

const { user, pass } = config.mongodb;

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${user}:${pass}@cluster0.lnyq7c9.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        //ttl: 15 al borrarlo, las sesiones por defecto duran 15 dias
    }),
    secret: 'asdf1234',
    resave: false,
    saveUninitialized: false
}))

initializePassport();
app.use(passport.initialize())
app.use(passport.session())

router(app)

app.use(errorHandler)


export default app