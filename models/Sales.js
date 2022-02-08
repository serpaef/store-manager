const connection = require('./connection');

async function getAll() {
  const query = 'SELECT * FROM sales';
  const [list] = connection.execute(query, []);
  return list;
}

module.exports = {
  getAll,
};
