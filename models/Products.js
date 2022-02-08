const connection = require('./connection');

async function getByName(name) {
  const query = 'SELECT * FROM products WHERE name = ?;';
  const [result] = await connection.execute(query, [name]);
  return result[0];
}

async function create(name, quantity) {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?);';
  await connection.execute(query, [name, quantity]);
  const result = await getByName(name);
  return result;
}

async function getAll() {
  const query = 'SELECT * FROM products;';
  const [list] = await connection.execute(query, []);
  return list;
}

async function getById(id) {
  const query = 'SELECT * FROM products WHERE id = ?;';
  const [result] = await connection.execute(query, [id]);
  return result[0];
}

module.exports = {
  create,
  getAll,
  getByName,
  getById,
};
