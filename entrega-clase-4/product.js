const ProductManager = require('./productManager')

const product = new ProductManager()

product.addProducts({'title': 'remera blanca', 'description': 'remera de hombre blanca', 'price': 5000, 'thumbnail': 'algun link', 'code': 'abc121', 'stock': 50});
product.addProducts({'title': 'remera blanca 2', 'description': 'remera de hombre blanca 2', 'price': 5000, 'thumbnail': 'algun link', 'code': 'abc122', 'stock': 50});
//product.addProducts({'title': 'remera blanca 2', 'description': 'remera de hombre blanca 2', 'price': 5000, 'thumbnail': 'algun link', 'code': 'abc122', 'stock': 50});

/* product.getProducts()
.then(products => console.log(products))
.catch(error => console.log(error)) */

/* product.getProductById(1)
.then(products => console.log(products))
.catch(error => console.log(error)) */

//product.updateProduct(2,{'title': 'remera cambio', 'description': 'remera de hombre cambio', 'price': 5000, 'thumbnail': 'algun link', 'code': 'abc121', 'stock': 50})

/* product.deleteProduct(2)
.then(el => console.log(el))
.catch(error => console.log(error)) */


