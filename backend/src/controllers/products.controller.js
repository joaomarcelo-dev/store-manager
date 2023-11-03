const productsService = require('../services/products.service');

const getAllProductController = async (_req, res) => {
  const { status, data } = await productsService.allProductsService();
  return res.status(status).json(data);
};

const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findProductByIdService(id);
  return res.status(status).json(data);
};

const createProductController = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productsService.createProductService(name);
  return res.status(status).json(data);
};

const updateProductController = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productsService.updateProductService(name, id);
  return res.status(status).json(data);
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.deleteProductService(id);
  return res.status(status).json(data);
};

const productsControllers = {
  getAllProductController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
};

module.exports = productsControllers;
