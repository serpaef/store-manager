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

function verifyQuantity(quantity) {
  if (quantity === null || quantity === undefined) return sendError(400, '"quantity" is required');
  if (typeof quantity !== 'number' || quantity < 1) {
    return sendError(422, '"quantity" must be a number larger than or equal to 1');
  }
}

async function create(name, quantity) {
  const product = await Products.create(name, quantity);
  return product;
}

async function getAll() {
  const list = await Products.getAll();
  return list;
}

async function getById(id) {
  const product = await Products.getById(id);
  return product;
}

module.exports = {
  sendError,
  verifyName,
  verifyDuplicate,
  verifyQuantity,
  create,
  getAll,
  getById,
};
