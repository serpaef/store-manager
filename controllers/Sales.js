const express = require('express');

const salesRoute = express.Router();

salesRoute.get('/', (_req, res) => res.status(200).json({ message: 'sup' }));

module.exports = salesRoute;
