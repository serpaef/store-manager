const connection = require('./connection');

async function getByName(name) {
  const query = 'SELECT * FROM products WHERE name = ?;';
  const result = await connection.execute(query, [name]);
  return result;
}

async function create(name, quantity) {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?);';
  await connection.execute(query, [name, quantity]);
  const result = await getByName(name);
  return result;
}

module.exports = {
  create,
  getByName,
};
