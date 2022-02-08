const connection = require('./connection');

async function generateSale() {
  const query = 'INSERT INTO sales (), VALUES();';
  const [sale] = await connection.execute(query, []);
  return sale.insertId;
}

async function registerSale(saleId, products) {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity), VALUES ?;';
  const values = products.map((product) => (
    [
      [saleId], [product.product_id], [product.quantity],
    ]
  ));
  /*
    https://stackoverflow.com/questions/67672322/bulk-insert-with-mysql2-and-nodejs-throws-500
    o connection.execute não consegue fazer bulk-insertions no banco de dados,
    para isso fazemos uso do connection.query 
  */
  await connection.query(query, values);
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

async function getAll() {
  const query = 'SELECT * FROM sales';
  const [list] = connection.execute(query, []);
  return list;
}

module.exports = {
  getAll,
  generateSale,
  registerSale,
  create,
};
