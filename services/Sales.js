const Sales = require('../models/Sales');

function sendError(status, message) {
  return { status, message };
}

async function create(sales) {
  const sale = await Sales.create(sales);
  return sale;
}

module.exports = {
  sendError,
  create,
};
