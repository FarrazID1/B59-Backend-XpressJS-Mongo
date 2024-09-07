import express from 'express';
import connectDB from './utils/database';
import routes from './routes/api';
import bodyParser from 'body-parser';

const app = express();
// const PORT = process.env.PORT || 3008;
const PORT = 3000;

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
