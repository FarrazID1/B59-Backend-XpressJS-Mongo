//TODO: 1) import express module -- use common js
const express = require('express');
const path = require('path');
//TODO: 2) initialize express app
const app = express();
const port = 3000;

//TODO: 3.1) Add Middleware - to log all requests
app.use((req, res, next) => {
  console.log(`method: ${req.method} - request for url: ${req.url}`);
  next();
});

//TODO: 3.2) Add Middleware - to serve static files in folder: 'public'
app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//TODO: 4.1) define route => root path (home)
// app.get('/', (req, res) => {
//   res.send('(route url: /) > Home page: Hello World!');
// });

//TODO: 4.2) define route => home with html
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/index.html'));
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

//TODO: 4.3) define route => /about
app.get('/about', (req, res) => {
  res.send('(route url: /about) > About page: defined by express');
});

//TODO: 4.4) define route => /contact
app.get('/contact', (req, res) => {
  res.send('(route url: /contact) > Contact page: defined by farraz');
});

//TODO: 4.5) define route => /hello
app.get('/hello', (req, res) => {
  res.send({
    message: '(route url: /hello) > Success fetch message',
    data: 'Hello World!',
  });
});

//TODO: 4.6) define route => /user
app.get('/user', (req, res) => {
  res.send({
    message: '(route url: /user) > Success fetch user',
    data: {
      id: 1,
      name: 'Farraz',
      username: 'Sarmento',
      email: 'farraz.doe@example.com',
    },
  });
});

//TODO: 5) listen to the port - display message when server is running
app.listen(port, () => {
  console.log(`Server (Node.js) is running at http://localhost:${port}/`);
});
