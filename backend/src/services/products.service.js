const productsModel = require('../models/products.model');

const {
  SUCCESS_FULL,
  ERROR_NOT_FOUND,
  SUCCESS_CREATED,
  SUCCESS_NO_CONTENT,
  UNPROCESSABLE_ENTITY,
} = require('../providers/statusApplication');

const allProductsService = async () => {
  const products = await productsModel.allProductsDBModel();
  return { status: SUCCESS_FULL, data: products };
};

const findProductByIdService = async (id) => {
  const product = await productsModel.findProductByIdDBModel(id);

  if (!product) return { status: ERROR_NOT_FOUND, data: { message: 'Product not found' } };

  return { status: SUCCESS_FULL, data: product };
};

const createProductService = async (name) => {
  try {
    const product = await productsModel.createProductDBModel(name);
    const productId = product.insertId;
    const dataProduct = await productsModel.findProductByIdDBModel(productId);
    return { status: SUCCESS_CREATED, data: dataProduct };
  } catch (error) {
     return { status: UNPROCESSABLE_ENTITY, data: { message: 'Error adding product' } };
  }
};

const updateProductService = async (name, id) => {
  const getProduct = await productsModel.findProductByIdDBModel(id);
  if (!getProduct) return { status: ERROR_NOT_FOUND, data: { message: 'Product not found' } };

  await productsModel.updateProductDBModel(name, id);

  const productNew = await productsModel.findProductByIdDBModel(id);

  return { status: SUCCESS_FULL, data: productNew };
};

const deleteProductService = async (id) => {
  const getProduct = await productsModel.findProductByIdDBModel(id);
  if (!getProduct) return { status: ERROR_NOT_FOUND, data: { message: 'Product not found' } };

  await productsModel.deleteProductDBModel(id);

  return { status: SUCCESS_NO_CONTENT, data: { message: 'Product deleted' } };
};

const productsService = {
  allProductsService,
  findProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
};

module.exports = productsService;