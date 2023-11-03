const connectionDB = require('../providers/connectionDB');

const allProductsDBModel = async () => {
  const [products] = await connectionDB.execute('SELECT * FROM products');
  return products;
};

const findProductByIdDBModel = async (id) => {
  const [[product]] = await connectionDB.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

const createProductDBModel = async (name) => {
  const [product] = await connectionDB.execute('INSERT INTO products (name) VALUES (?)', [name]);
  return product;
};

const updateProductDBModel = async (name, id) => {
  const [productUpdate] = await connectionDB
    .execute('UPDATE products SET name=? WHERE id=?', [name, id]);
  return productUpdate;
};

const deleteProductDBModel = async (id) => {
  const [productDelete] = await connectionDB.execute('DELETE FROM products WHERE id=?', [id]);
  return productDelete;
};

const productsModel = {
  allProductsDBModel,
  findProductByIdDBModel,
  createProductDBModel,
  updateProductDBModel,
  deleteProductDBModel,
};

module.exports = productsModel;
