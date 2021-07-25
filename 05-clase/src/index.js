const http = require('http');
const body = require('./functions/index');

const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  const html = body();
  res.end(html);
});

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});
