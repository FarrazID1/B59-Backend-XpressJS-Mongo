import express, { Request, Response } from 'express';

const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const PORT = process.env.PORT || 3001;

function init() {
  const app = express();

  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      message: '<port 3001> Server: Init Testing - OK',
      data: null,
    });
  });

  //TODO: use middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

init();
