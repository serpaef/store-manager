const Products = require('../models/Products');

function sendError(status, message) {
  return { status, message };
}

function verifyName(name) {
  switch (true) {
    case !name: return sendError(400, '"name" is required');
    case typeof name !== 'string': return sendError(422, '"name" must be a string');
    case name.length < 5: return sendError(422, '"name" length must be at least 5 characters long');
    default:
      break;
  }
}

async function verifyDuplicate(name) {
  const product = await Products.getByName(name);
  if (product) return sendError(409, 'Product already exists');
}

module.exports = {
  sendError,
  verifyName,
  verifyDuplicate,
};
