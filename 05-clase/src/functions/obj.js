const random = require('./random');

module.exports = () =>  {
  let obj = {
    id: `${Math.floor(random(1, 10))}`,
    title: `Producto ${Math.floor(random(1, 10))}`,
    price: `${random(0.0, 9999.99).toFixed(2)}`,
    thumbnail: `Foto ${Math.floor(random(1, 10))}`
  };
  return obj;
}