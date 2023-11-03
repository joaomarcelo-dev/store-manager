const { Router } = require('express');
const productsControllers = require('../controllers/products.controller');
const validateNameProduct = require('../middlewares/products.middleware');

const routerProducts = Router();

routerProducts.get(
  '/', 
  productsControllers.getAllProductController,
);

routerProducts.get(
  '/:id',
  productsControllers.getProductByIdController,
);

routerProducts.post(
  '/',
  validateNameProduct,
  productsControllers.createProductController,
);

routerProducts.put(
  '/:id',
  validateNameProduct,
  productsControllers.updateProductController,
);

routerProducts.delete(
  '/:id',
  productsControllers.deleteProductController,
);

module.exports = routerProducts;
