const data = require('./obj');

module.exports = () => {
  const obj = JSON.stringify(data());

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Clase 05</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <p>${obj}</p>
    </body>
  </html>`;
};
