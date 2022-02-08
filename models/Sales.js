const connection = require('./connection');

async function generateSale() {
  const query = 'INSERT INTO sales () VALUES ();';
  const [sale] = await connection.execute(query, []);
  return sale.insertId;
}

async function registerSale(saleId, products) {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ?;';
  const values = products.map((product) => ([[saleId], [product.product_id], [product.quantity]]));
  /*
    https://stackoverflow.com/questions/67672322/bulk-insert-with-mysql2-and-nodejs-throws-500
    o connection.execute não consegue fazer bulk-insertions no banco de dados,
    para isso fazemos uso do connection.query 
  */
  await connection.query(query, [values]);
}

async function getItemSoldBySaleId(id) {
  const query = 'SELECT * FROM sales_products WHERE sale_id = ?';
  const [sales] = await connection.execute(query, [id]);
  return sales;
}

async function create(sales) {
  const id = await generateSale();
  await registerSale(id, sales);

  const itemsSold = await getItemSoldBySaleId(id);

  return { id, itemsSold };
}

async function readAll() {
  const query = 'SELECT sale_id AS saleId, \'date\', product_id, quantity FROM '
  + 'sales_products as sp INNER JOIN sales as s ON sp.sale_id = s.id;';
  const [sales] = await connection.execute(query, []);
  return sales;
}

async function getById(id) {
  const query = 'SELECT "date", product_id, quantity '
  + 'FROM sales_products as sp INNER JOIN sales as s ON sp.sale_id = s.id '
  + 'WHERE sp.sale_id = ?';
  const [sale] = await connection.execute(query, [id]);
  return sale;
}

async function update(id, sale) {
  const query = 'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?;';
  await connection.execute(query, [sale.product_id, sale.quantity, id]);
}

async function deleteSale(id) {
  const salesQuery = 'DELETE FROM sales WHERE id = ?;';
  const spQuery = 'DELETE FROM sales_products WHERE sale_id = ?;';
  
  const sale = await getById(id);

  await connection.execute(salesQuery, [id]);
  await connection.execute(spQuery, [id]);

  return sale;
}

module.exports = {
  generateSale,
  registerSale,
  create,
  readAll,
  getById,
  getItemSoldBySaleId,
  update,
  deleteSale,
};
