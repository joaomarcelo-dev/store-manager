const { Router } = require('express');
const salesControllers = require('../controllers/sales.controller');
const { validSalesPost } = require('../middlewares/sales.middleware');

const routerSales = Router();

routerSales.get(
  '/',
  salesControllers.getAllSalesController,
);

routerSales.get(
  '/:id',
  salesControllers.getAllSalesByIdController,
);

routerSales.post(
  '/',
  ...validSalesPost,
  salesControllers.createSalesController,
);

routerSales.delete(
  '/:id',
  salesControllers.deleteSalesController,
);

module.exports = routerSales;