const express = require('express');
const Products = require('../services/Products');

const productsRoute = express.Router();

function validateName(req, res, next) {
  const { name } = req.body;

  const nameValidation = Products.verifyName(name);

  if (nameValidation) {
    return res
      .status(nameValidation.status)
      .json({ message: nameValidation.message });
  }

  next();
}

async function verifyDuplicate(req, res, next) {
  const { name } = req.body;

  const duplicate = await Products.verifyDuplicate(name);
  
  if (duplicate) {
    return res
      .status(duplicate.status)
      .json({ message: duplicate.message });
  }

  next();
}

function verifyQuantity(req, res, next) {
  const { quantity } = req.body;

  const validQt = Products.verifyQuantity(quantity);

  if (validQt) {
    return res
      .status(validQt.status)
      .json({ message: validQt.message });
  }

  next();
}

async function create(req, res) {
  const { name, quantity } = req.body;
  const product = await Products.create(name, quantity);
  return res.status(201).json(product);
}

async function getAll(_req, res) {
  const list = await Products.getAll();
  return res.status(200).json(list);
}

async function getById(req, res) {
  const { id } = req.params;
  
  const product = await Products.getById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  
  return res.status(200).json(product);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, quantity } = req.body;
  
  const product = await Products.getById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const updatedProduct = await Products.updateProduct(id, name, quantity);

  return res.status(200).json(updatedProduct);
}

async function deleteProduct(req, res) {
  const { id } = req.params;

  const product = await Products.getById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await Products.deleteProduct(id);

  return res.status(200).json(product);
}

productsRoute
.post('/', 
  validateName,
  verifyDuplicate,
  verifyQuantity,
  create)
.get('/:id',
  getById)
.get('/',
  getAll)
.put('/:id',
  validateName,
  verifyQuantity,
  updateProduct)
.delete('/:id',
  deleteProduct);

module.exports = productsRoute;
