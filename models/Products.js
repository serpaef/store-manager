const connection = require('./connection');

async function create(name, quantity) {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';
  await connection.execute(query, [name, quantity]);
}

module.exports = {
  create,
};