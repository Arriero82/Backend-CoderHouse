import express from "express";
import mongoose from "mongoose";
import __dirname from './utils.js'
import router from './router/index.js'
import config from "./config/index.js";
import handlebars from 'express-handlebars'

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.engine("handlebars", handlebars.engine())
app.set('views', __dirname + "/views")
app.set("view engine", "handlebars")

const { user, pass } = config.mongodb;

mongoose.set('strictQuery', false)
mongoose.connect(
    `mongodb+srv://${user}:${pass}@cluster0.lnyq7c9.mongodb.net/?retryWrites=true&w=majority`, (error) => {
        if(error){
            console.log(`cannot connect to db. Error: ${error}`);
        }
    }
)

router(app)

export default app