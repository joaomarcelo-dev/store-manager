const connectionDB = require('../providers/connectionDB');

const allSalesDBModel = async () => {
  const [sales] = await connectionDB.execute(`
    SELECT
    sales.id AS saleId,
    sales.date,
    salesP.product_id AS productId,
    salesP.quantity
    -- ...
    FROM
      sales AS sales
    INNER JOIN
      sales_products AS salesP
    ON
      sales.id = salesP.sale_id
    ORDER BY
      saleId ASC,
      productId ASC LIMIT 0,100
  `);

  return sales;
};

const findSalesByIdDBModel = async (id) => {
  const [sales] = await connectionDB.execute(`
    SELECT sales.date, salesP.product_id AS productId, salesP.quantity
    -- ...
    FROM sales AS sales
    INNER JOIN sales_products AS salesP
    ON sales.id = salesP.sale_id
    WHERE sales.id = ?
    LIMIT 0,100
  `, [id]);

  return sales;
};

const createSaleDBModel = async () => {
  const [sale] = await connectionDB.execute('INSERT INTO sales () VALUES ()');
  return sale;
};

const createSaleProductDBModel = async (saleId, productId, quantity) => {
  const [saleProduct] = await connectionDB.execute(
  `
    INSERT INTO sales_products (sale_id, product_id, quantity) 
    VALUES (?, ?, ?)
  `, 
    [saleId, productId, quantity],
  );

  return saleProduct;
};

const deleteSalesDBModel = async (id) => {
  const [sale] = await connectionDB.execute('DELETE FROM sales WHERE id = ?', [id]);
  return sale;
};

const salesModels = {
  allSalesDBModel,
  findSalesByIdDBModel,
  createSaleDBModel,
  createSaleProductDBModel,
  deleteSalesDBModel,
};

module.exports = salesModels;
