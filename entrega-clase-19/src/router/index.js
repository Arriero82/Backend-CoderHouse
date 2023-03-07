import productsController from '../products/controller.products.js'
import cartsController from '../carts/controller.carts.js'
import messageController from '../messages/controller.messages.js'
import usersController from '../users/controller.users.js'

const router = (app) => {
    app.use('/api/products', productsController)
    app.use('/api/carts', cartsController)
    app.use('/', messageController)
    app.use('/api/users', usersController)
}

export default router

