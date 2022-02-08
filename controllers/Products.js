const express = require('express');
const Products = require('../services/Products');

const productsRoute = express.Router();

async function validateName(req, res, next) {
  const { name } = req.body;

  const nameValidation = Products.verifyName(name);

  if (nameValidation) {
    return res
      .status(nameValidation.status)
      .json({ message: nameValidation.message });
  }

  const nameDuplicate = await Products.verifyDuplicate(name);
  if (nameDuplicate) {
    return res
      .status(nameDuplicate.status)
      .json({ message: nameDuplicate.message });
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

productsRoute
.post('/', 
  validateName,
  verifyQuantity,
  create)
.get('/',
  getAll);

module.exports = productsRoute;
