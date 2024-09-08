import express from 'express';
import connectDB from './utils/database';
import routes from './routes/api';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3007;

async function init() {
  try {
    await connectDB();

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //define baseUrl => http://localhost:3000/api
    app.use('/api', routes);

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
