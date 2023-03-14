import productsController from '../products/controller.products.js'
import cartsController from '../carts/controller.carts.js'
import messageController from '../messages/controller.messages.js'
import usersController from '../users/controller.users.js'
import viewsTemplateController from '../viewsTemplate/controller.viewsTemplate.js'
import authController from '../auth/controller.auth.js'

const router = (app) => {
    app.use('/api/products', productsController)
    app.use('/api/carts', cartsController)
    app.use('/', messageController)
    app.use('/api/users', usersController)
    app.use('/api', viewsTemplateController)
    app.use('/api/auth', authController)
}

export default router

