const connection = require('./connection');

async function createSale() {
  const query = 'INSERT INTO sales (), VALUES();';
  const [sale] = await connection.execute(query, []);
  return sale.insertId;
}

async function getAll() {
  const query = 'SELECT * FROM sales';
  const [list] = connection.execute(query, []);
  return list;
}

module.exports = {
  getAll,
  createSale,
};
