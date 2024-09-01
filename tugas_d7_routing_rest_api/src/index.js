//TODO: 1) import express module -- use common js
const express = require('express');
const path = require('path');
//TODO: 2) initialize express app
const app = express();
const port = 3005;

//TODO: 3.1) Add Middleware - to log all requests
app.use((req, res, next) => {
  console.log(`/Log :: method: ${req.method} - request for url: ${req.url}`);
  next();
});

//TODO: 3.2) Add Middleware - to serve static files in folder: 'public'
app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.urlencoded({ extended: true }));

//TODO: 3.3) Add Middleware - to parse json
app.use(express.json()); // for parsing application/json

//TODO: 4.1) define simple route (GET) => root path (home)
// app.get('/', (req, res) => {
//   res.send('(route url: /) > Home page: Hello World!');
// });

//TODO: 4.2) define simple route (GET) => home with html
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/index.html'));
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

//TODO: 4.3) define simple route (GET) => get all users
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Arkan' },
    { id: 2, name: 'Jane' },
  ]);
});

//TODO: 5) define (dummy) data for categories - array of objects
let categories = [
  { id: 1, name: 'Elektronik' },
  { id: 2, name: 'Perabotan' },
];

let products = [
  { id: 1, name: 'Laptop', category: 'Elektronik' },
  { id: 2, name: 'Meja', category: 'Perabotan' },
  { id: 3, name: 'Speaker', category: 'Elektronik' },
];

//--- SOAL 1 ---
//TODO: 6.1) define route (GET) => get all categories
app.get('/api/categories', (req, res) => {
  //res.send('GET => all categories: ', categories);
  res.json(categories);

  console.log('GET => response status:', res.statusCode); //* 200 OK
  console.log('GET => all categories: ', categories);
});

//--- SOAL 2 ---
//TODO: 6.2) define route (GET) => get category by id
app.get('/api/categories/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = categories.find((cat) => cat.id === categoryId);

  //if category not found
  if (!category) {
    res.status(404).json({ message: 'Category not found' });
  } else {
    res.json(category);
  }
  console.log('GET => response status:', res.statusCode); //* 200 OK
});

//--- SOAL 3 ---
//TODO: 6.3) define route (POST) => create new category
app.post('/api/categories', (req, res) => {
  //define new category -- from req.body (in Postman)
  const newCategory = req.body;

  //define new id -- by adding 1 to the last id in the array
  //-- or use 1 if array is empty
  newCategory.id = categories.length
    ? categories[categories.length - 1].id + 1
    : 1;

  //validate id
  if (!newCategory.id) {
    res.status(400).json({ message: 'Id is required' });
  }

  //validate name
  if (!newCategory.name) {
    res.status(400).json({ message: 'Name is required' });
  }

  categories.push(newCategory); //-- use 'push()' to add new category
  res.status(201).send({
    message: 'New category created successfully!',
    category: newCategory,
    // display return (JSON): message, newCategory -- in Postman
  });
  console.log('POST => response status:', res.statusCode); //* 201 Created
});

//--- SOAL 4 ---
//TODO: 6.4) define route (PUT) => update category by id
app.put('/api/categories/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const categoryIndex = categories.findIndex((cat) => cat.id === categoryId);

  if (!categoryIndex === -1) {
    res.status(404).json({ message: 'Category not found' });
  } else {
    categories[categoryIndex] = { ...categories[categoryIndex], ...req.body };
    // res.json(categories[categoryIndex]);
    res.send({
      message: 'Category updated successfully!',
      category: categories[categoryIndex],
    });
  }
  console.log('PUT => response status:', res.statusCode); //* 200 OK
});

//--- SOAL 5 ---
//TODO: 6.5) define route (DELETE) => delete category by id
app.delete('/api/categories/:id', (req, res) => {
  //define selected category.id -- to be deleted
  const selCategoryId = parseInt(req.params.id);

  //TODO: define eXisting categories -- use 'filter()'
  const categoriesX = categories.filter((cat) => cat.id !== selCategoryId);
  //? use 'filter' method - to re-arrange the array that meets the condition => category.id !== categoryId
  res.send({
    message: 'Category deleted successfully!',
    categories: categoriesX,
  });
  //?-- if the category.id does 'not match' the provided categoryId, it will be kept in the array
  //?-- if the category.id matches the provided categoryId, it will be removed from the array
  console.log('DELETE => response status:', res.statusCode);
});

//TODO: 7.1) define route (GET) => get all products
// app.get('/api/products', (req, res) => {
//   res.json(products);
//   console.log('GET => response status:', res.statusCode);
// });

//TODO: 7.2) define route (GET) => get product by name - use query parameter
// app.get('/api/products/:name', (req, res) => {
//   const name = req.params.name;
//   const product = products.find((p) => p.name === name);

//   //if product not found
//   if (!product) {
//     res.status(404).json({ message: 'Product not found' });
//     // res.status(404).send('Product not found');
//   } else {
//     res.json(product);
//   }
//   console.log('GET => response status:', res.statusCode);
// });

//--- SOAL 6 ---
//TODO: 7.3) define route (GET) => get product by name - use query string
//* --EX.url: http://localhost:3005/api/products?name=meja
app.get('/api/products', (req, res) => {
  const searchName = req.query.name?.toLowerCase();
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchName)
  );

  if (filteredProducts.length > 0) {
    res.status(200).json(filteredProducts);
  } else {
    res.status(404).json({ message: 'Product not found with this name' });
  }
  console.log('GET => response status:', res.statusCode);
});

//TODO: 7.2) define route (GET) => get product by category & name - use query parameter
// app.get('/api/products/:category/:name', (req, res) => {
//   const category = req.params.category;
//   const name = req.params.name;
//   const product = products.find(
//     (p) => p.category === category && p.name === name
//   );
//   if (!product) {
//     res.status(404).json({ message: 'Product not found' });
//   } else {
//     res.json(product);
//   }
//   console.log('GET => response status:', res.statusCode);
// });

//--- SOAL 7 ---
//TODO: 7.2) define route (GET) => get product by category (use parameter) & name (use query string)
//* --EX.url: http://localhost:3005/api/products/Elektronik?name=speaker  -> it works
//* --EX.url: http://localhost:3005/api/products/Elektronik?name=lap  -> it also works
//* --EX.url: http://localhost:3005/api/products/Elektronik?name=  -> it also works - show all products with same category

app.get('/api/products/:category', (req, res) => {
  const paramCategory = req.params.category;
  const queryName = req.query.name?.toLowerCase();

  const filteredProducts = products.filter(
    (product) =>
      product.category === paramCategory &&
      (queryName ? product.name.toLowerCase().includes(queryName) : true)
  );

  if (filteredProducts.length > 0) {
    // res.status(200).json(filteredProducts);
    res.status(200).json({
      message: 'Search result - product found',
      results: filteredProducts,
    });
  } else {
    res.status(404).json({ message: 'No products found in that category' });
  }

  console.log('GET => response status:', res.statusCode);
});

//TODO: 8) listen to the port - display message when server is running
app.listen(port, () => {
  console.log(`Server (Node.js) is running at http://localhost:${port}/`);
});
