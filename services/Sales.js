const Sales = require('../models/Sales');

function sendError(status, message) {
  return { status, message };
}

function verifyProductId(sales) {
  for (let i = 0; i < sales.length; i += 1) {
    if (!sales[i].product_id) {
      return sendError(400, '"product_id" is required');
    }
  }
}

function verifyProductQuantity(sale) {
  if (!sale.quantity) {
    return sendError(400, '"quantity" is required');
  }
  if (typeof sale.quantity !== 'number' || sale.quantity < 1) {
    return sendError(
      422,
      '"quantity" must be a number larger than or equal to 1',
    );
  }
}

async function create(sales) {
  const sale = await Sales.create(sales);
  return sale;
}

module.exports = {
  sendError,
  verifyProductId,
  verifyProductQuantity,
  create,
};
