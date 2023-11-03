const salesServices = require('../services/sales.service');

const getAllSalesController = async (_req, res) => {
  const { status, data } = await salesServices.allSalesService();
  res.status(status).json(data);
};

const getAllSalesByIdController = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesServices.findSalesByIdService(id);
  res.status(status).json(data);
};

const createSalesController = async (req, res) => {
  const sales = req.body;
  const { status, data } = await salesServices.createSaleService(sales);
  res.status(status).json(data);
};

const deleteSalesController = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesServices.deleteSalesService(id);
  res.status(status).json(data);
};

const salesControllers = {
  getAllSalesController,
  getAllSalesByIdController,
  createSalesController,
  deleteSalesController,
};

module.exports = salesControllers;
