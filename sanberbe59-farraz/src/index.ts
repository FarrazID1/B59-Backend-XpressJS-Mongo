//! (./src/server.ts) -- same as: (./src/index.ts) - (agung)

import express from 'express';
import connectDB from './utils/database';
import routes from './routes/api';
import bodyParser from 'body-parser';

//initialize express app
const app = express();
const PORT = 3007;

//call db function - to connect to database
connectDB();

//define middleware - to parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// define baseUrl => http://localhost:3000/api
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
