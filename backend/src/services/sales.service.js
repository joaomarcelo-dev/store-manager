const productServices = require('../models/products.model');

const salesModels = require('../models/sales.model');

const {
  SUCCESS_FULL,
  ERROR_NOT_FOUND,
  SUCCESS_CREATED,
  SUCCESS_NO_CONTENT,
} = require('../providers/statusApplication');

const allSalesService = async () => {
  const sales = await salesModels.allSalesDBModel();
  return { status: SUCCESS_FULL, data: sales };
};

const findSalesByIdService = async (id) => {
  const sales = await salesModels.findSalesByIdDBModel(id);

  if (!sales.length) return { status: ERROR_NOT_FOUND, data: { message: 'Sale not found' } };

  return { status: SUCCESS_FULL, data: sales };
};

const createSaleService = async (sales) => {
  const productExistencePromises = sales.map(async (sale) => {
    const product = await productServices.findProductByIdDBModel(sale.productId);
    return !!product;
  });

  const productExistenceResults = await Promise.all(productExistencePromises);

  if (productExistenceResults.some((exists) => !exists)) {
    return { status: ERROR_NOT_FOUND, data: { message: 'Product not found' } };
  }

  const saleCreated = await salesModels.createSaleDBModel();
  const saleId = saleCreated.insertId;

  const allSalesCreated = await Promise.all(sales.map(async (sale) => {
    const { productId, quantity } = sale;
    await salesModels.createSaleProductDBModel(saleId, productId, quantity);

    return { productId, quantity };
  }));

  return {
    status: SUCCESS_CREATED, data: { id: saleId, itemsSold: allSalesCreated },
  };
};

const deleteSalesService = async (id) => {
  const saleExists = await salesModels.findSalesByIdDBModel(id);

  if (!saleExists.length) return { status: ERROR_NOT_FOUND, data: { message: 'Sale not found' } };

  const sale = await salesModels.deleteSalesDBModel(id);
  return { status: SUCCESS_NO_CONTENT, data: sale };
};

const salesServices = {
  allSalesService,
  findSalesByIdService,
  createSaleService,
  deleteSalesService,
};

module.exports = salesServices;
