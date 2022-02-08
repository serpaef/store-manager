require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/Products');

const app = express();
app.use(bodyParser.json());

app.use('/products', productController);

const { PORT } = process.env;

app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
