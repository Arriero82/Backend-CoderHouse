class ProductManager {
  constructor() {
    this.products = [];
  }
  getProducts() {
    return this.products;
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      title: title || "missing",
      description: description ?? "missing",
      price: price || "missing",
      thumbnail: thumbnail ?? "missing",
      code: code || "missing",
      stock: stock || "missing",
    };

    let anyMissing = Object.values(product);
    let anyMissingKeyValues = Object.entries(product);

    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }

    let codeArray = [];
    this.products.forEach((el) => {
      codeArray.push(el.code);
    });

    if (anyMissing.includes("missing")) {
      console.log(`missing information, please see: ${anyMissingKeyValues}`);
    } else {
      if (codeArray.includes(product.code)) {
        console.log(`product code already in use: ${product.code}`);
      } else {
        this.products.push(product);
      }
    }
  }

  getProductById(id) {
    let products = this.getProducts();
    let product = products.filter(prod => prod.id === id)
    if(product.length == 0){
        return `no product found with id ${id}`
    }else{
        return product[0];
    }
  }
}

let remeras = new ProductManager();
remeras.addProduct('remera1', 'remera hombre', 5000, 'algun link', 'abc123', 50);
remeras.addProduct('remera2','remera hombre',5000,'algun link','abc124', 50)
remeras.addProduct('','remera hombre',5000,'algun link','abc125', 50)
remeras.addProduct(null,'remera hombre',5000,'algun link','abc125')
console.log(remeras.getProducts());
//console.log(remeras.getProductById(1));
//console.log(remeras.getProductById(3));
