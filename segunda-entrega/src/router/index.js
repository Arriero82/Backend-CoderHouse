import productsController from '../products/controller.products.js'
import cartsController from '../carts/controller.carts.js'
import messageController from '../messages/controller.messages.js'

const router = (app) => {
    app.use('/api/products', productsController)
    app.use('/api/carts', cartsController)
    app.use('/', messageController)
}

export default router

