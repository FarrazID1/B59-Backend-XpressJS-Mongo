// 2) Buat server HTTP sederhana dengan Node.js yang merespons "Hello, World!" untuk setiap permintaan.

const http = require('http');
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Response from server (http) => Hello, World!');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
