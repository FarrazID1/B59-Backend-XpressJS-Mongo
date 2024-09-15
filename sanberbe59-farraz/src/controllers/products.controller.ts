import { Request, Response } from 'express';
import ProductsModel from '../models/products.model';
import * as Yup from 'yup';

//TODO: import all 'service functions' - business logic (CRUD)
import {
  create,
  findAll,
  findOne,
  update,
  remove,
} from '../services/products.service';

import { IPaginationQuery } from '../utils/interfaces';

const createValidationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  images: Yup.array().of(Yup.string()).required().min(1),
  price: Yup.number().required(),
  qty: Yup.number().required().min(1),
  categoryId: Yup.string().required(),
});

//TODO: define controller functions
export default {
  async create(req: Request, res: Response) {
    try {
      await createValidationSchema.validate(req.body);

      const result = await create(req.body); // here, result == new product

      res.status(201).json({
        data: result,
        message: 'Success create product',
      });
    } catch (error) {
      //TODO: D11 > 1.4) - add 'error handling' here - validation
      if (error instanceof Yup.ValidationError) {
        res.status(400).json({
          data: error.errors,
          message: 'Failed create product',
        });
        return;
      }

      //? --previous (D10)
      // const err = error as Error;
      res.status(500).json({
        // data: err.message,
        data: (error as Error).message,
        message: 'Failed create product',
      });
    }
  },
  async findAll(req: Request, res: Response) {
    try {
      //TODO: D9 ~ D10 > if NO Pagination here  ========================
      // const result = await ProductsModel.find().populate('categoryId');
      //? find().populate('categoryId') - it means find all products and then populate the 'categoryId' field
      //? --previous (D9) - before using service-pattern
      // const result = await ProductsModel.find();
      //? --updated (D10) - no use ProductsModel here - replaced by service function (findAll)
      // const result = await findAll();
      // res.status(200).json({
      //   data: result,
      //   message: 'Success get all products',
      // });
      //TODO: D11 > if use Pagination ==================================
      //? NOTE: Tugas D11: Pagination Query
      //? firstly, define product.service function (findAll) - using pagination
      //? -- Test url: http://localhost:3000/products?page=1&limit=10
      //? -- Test url: http://localhost:3000/products?page=1&limit=10&search=
      //? -- Test url: http://localhost:3000/products?page=1&limit=10&search=celana
      //? -- Test url: http://localhost:3000/products?page=1&limit=10&search=celana%20kemeja

      //TODO: D11 > 2.2) use Pagination - define 'query' here
      const {
        limit = 10,
        page = 1,
        search = '',
      } = req.query as unknown as IPaginationQuery;
      const query = {};
      if (search) {
        Object.assign(query, {
          name: { $regex: search, $options: 'i' },
        });
      }

      //TODO: D11 > 2.3) use Pagination - define 'result'
      const result = await findAll(query, +limit, +page);

      //TODO: D11 > 2.4) use Pagination - define 'response'
      const total = await ProductsModel.countDocuments(query);
      res.status(200).json({
        data: result,
        message: 'Success get all products',
        page: +page,
        limit: +limit,
        total,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      // const err = error as Error;
      res.status(500).json({
        // data: err.message,
        data: (error as Error).message,
        message: 'Failed get all products',
      });
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      const result = await findOne(req.params?.id);

      res.status(200).json({
        data: result,
        message: 'Success get one product',
      });
    } catch (error) {
      // const err = error as Error;
      res.status(500).json({
        // data: err.message,
        data: (error as Error).message,
        message: 'Failed get one product',
      });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const result = await update(req.params?.id, req.body);

      res.status(200).json({
        data: result,
        message: 'Success update product',
      });
    } catch (error) {
      // const err = error as Error;
      res.status(500).json({
        // data: err.message,
        data: (error as Error).message,
        message: 'Failed update product',
      });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const result = await remove(req.params?.id);

      res.status(200).json({
        data: result,
        message: 'Success delete product',
      });
    } catch (error) {
      // const err = error as Error;
      res.status(500).json({
        // data: err.message,
        data: (error as Error).message,
        message: 'Failed delete product',
      });
    }
  },
};
