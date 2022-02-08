const express = require('express');
const Sales = require('../services/Sales');

const salesRoute = express.Router();

function verifyProductId(req, res, next) {
  const sales = req.body;
  const error = Sales.verifyProductId(sales);
  if (error) return res.status(error.status).json({ message: error.message });
  next();
}

function verifyProductQuantity(req, res, next) {
  const sales = req.body;
  for (let i = 0; i < sales.length; i += 1) {
    const error = Sales.verifyProductQuantity(sales[i]);
    if (error) return res.status(error.status).json({ message: error.message });
  }
  next();
}

async function create(req, res) {
  const sales = req.body;
  const closedSale = await Sales.create(sales);
  return res.status(201).json(closedSale);
}

async function readAll(_req, res) {
  const sales = await Sales.readAll();
  return res.status(200).json(sales);
}

salesRoute
.post('/',
  verifyProductId, 
  verifyProductQuantity,
  create)
.get('/',
  readAll);

module.exports = salesRoute;
