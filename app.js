const { list } = require('./lib/products');
const { version } = require('./package.json');
const express = require('express');
const app = express();

app.get('/v1/products', async (req, res, next) => {
  // fetches the entire list of the products
  try {
    const products = await list();
    res.jsonp({ products, });
  } catch (e) {
    //error handler
    next(e);
  }
});

app.get('/v1/products:id', async (req, res, next) => {
  // fetches the product details of the product id specified
  try {
    const products = await list();
    const searchedProduct = products.find(item => item.id === parseInt(req.params.id.slice(1)));
    if (searchedProduct) {
      res.send(searchedProduct);
    } else {
      res.status('404').send('Product with the given product id was not found');
    }
  } catch (e) {
    //error handler
    next(e);
  }
});

app.get('/v1/ping', (req, res) => {
  // returns the current version of the microservice in ```package.json```
  res.send(version);
});

app.use((req, res, next) => {
  // For invalid requests
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  // for error handling
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
});


const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening...${port}`));

module.exports = app;
