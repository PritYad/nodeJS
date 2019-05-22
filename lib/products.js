const MIN = 1;
const MAX = 5;

const { products } = require('./mock.products.data');


const randomNumber = (min = 200, max = 2000) => Math.random() * (max - min) + min;

const shouldThrowError = () => (randomNumber(MAX, MIN) === 3) ? true : false;

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

exports.list = async function () {
  if (shouldThrowError()) {
    throw (new Error('An unknown error occurred'));
  }

  await sleep(
    randomNumber()
  );
  return products;
};