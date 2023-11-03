const { SUCCESS_FULL } = require('../../src/providers/statusApplication');

const allSales = [
  {
    saleId: 1,
    date: '2023-09-20T04:31:35.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-09-20T04:31:35.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-09-20T04:31:35.000Z',
    productId: 3,
    quantity: 15,
  },
];

const returnAllSalesServiceSuccesses = {
  status: SUCCESS_FULL,
  data: allSales,
};

module.exports = {
  allSales,
  returnAllSalesServiceSuccesses,
};
