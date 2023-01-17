const express = require('express')
require('dotenv').config()

const routes = require('./routes')   

const app = express()   

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

routes(app);  

const server = app.listen(process.env.PORT, () => {
    console.log(`server running at port ${server.address().port}`);
})