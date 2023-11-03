const { ERROR_BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../providers/statusApplication');

const validateIdProduct = (req, res, next) => {
  const sales = req.body;

  const isValid = sales.every((sale) => !!sale.productId);

  if (!isValid) {
    return res.status(ERROR_BAD_REQUEST).json(
      {
        message: '"productId" is required',
      },
    );
  }

  next();
};

const validateQuantity = (req, res, next) => {
  const sales = req.body;

  if (sales.some((sale) => sale.quantity === undefined || sale.quantity === null)) {
    return res.status(ERROR_BAD_REQUEST).json(
      {
        message: '"quantity" is required',
      },
    );
  }

  if (sales.some((sale) => sale.quantity <= 0)) {
    return res.status(UNPROCESSABLE_ENTITY).json(
      {
        message: '"quantity" must be greater than or equal to 1',
      },
    );
  }

  next();
};

const validSalesPost = [
  validateQuantity,
  validateIdProduct,
];

module.exports = {
  validSalesPost,
};