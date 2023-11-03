const { SUCCESS_FULL } = require('../../src/providers/statusApplication');

const allProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capit\u00C3\u00A3o Am\u00C3\u00A9rica',
  },
];

const returnAllProductsServiceSuccesses = {
  status: SUCCESS_FULL,
  data: allProducts,
};

module.exports = {
  returnAllProductsServiceSuccesses,
};
