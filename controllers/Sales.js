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

async function verifyProductAvailability(req, res, next) {
  const sales = req.body;
  
  const errorList = [];
  for (let i = 0; i < sales.length; i += 1) {
    errorList.push(Sales.verifyProductAvailability(sales[0].product_id, sales[0].quantity));
  }

  const resolve = await Promise.all(errorList);
  for (let i = 0; i < resolve.length; i += 1) {
    if (resolve[i]) {
      return res.status(resolve[i].status).json({ message: resolve[i].message });
    }
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

async function getById(req, res) {
  const { id } = req.params;
  const sale = await Sales.getById(id);
  if (!sale || sale.length < 1) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(sale);
}

async function update(req, res) {
  const { id } = req.params;
  const [sale] = req.body;
  const updatedSale = await Sales.update(id, sale);
  return res.status(200).json(updatedSale);
}

async function deleteSale(req, res) {
  const { id } = req.params;
  const sale = await Sales.getById(id);
  if (!sale || sale.length < 1) return res.status(404).json({ message: 'Sale not found' });
  const deletedItems = await Sales.deleteSale(id);
  return res.status(200).json(deletedItems);
}

salesRoute
.post('/',
  verifyProductId, 
  verifyProductQuantity,
  verifyProductAvailability,
  create)
.get('/:id',
  getById)
.get('/',
  readAll)
.put('/:id',
 verifyProductId,
 verifyProductQuantity,
 update)
.delete('/:id',
  deleteSale);

module.exports = salesRoute;
