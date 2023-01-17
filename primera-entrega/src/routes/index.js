const products = require('../controllers/products.controllers')
//const carts = require('../controllers/carts.controllers')

const routes = (app) => {
    app.use('/api/products', products)
    //app.use('/carts', carts)
}

module.exports = routes 