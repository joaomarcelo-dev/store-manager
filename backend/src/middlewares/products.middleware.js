const { ERROR_BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('../providers/statusApplication');

const validateNameProduct = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(ERROR_BAD_REQUEST).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(UNPROCESSABLE_ENTITY).json(
      { 
        message: '"name" length must be at least 5 characters long',
      },
    );
  }
  
  next();
};

module.exports = validateNameProduct;
