import { Request, Response } from 'express';
import ProductsModel from '../models/products.model';

//TODO; define controller functions
//? -- controller is used to handle request from client
export default {
  async create(req: Request, res: Response) {
    try {
      const result = await ProductsModel.create(req.body);
      res.status(201).json({
        data: result,
        message: 'Success create product',
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: 'Failed create product',
      });
    }
  },
  async findAll(req: Request, res: Response) {
    try {
      const result = await ProductsModel.find().populate('categoryId');
      res.status(200).json({
        data: result,
        message: 'Success get all products',
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: 'Failed get all products',
      });
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      const result = await ProductsModel.findById(req.params.id).populate(
        'categoryId'
      );
      res.status(200).json({
        data: result,
        message: 'Success get one product',
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: 'Failed get one product',
      });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const result = await ProductsModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate('categoryId');

      res.status(200).json({
        data: result,
        message: 'Success update product',
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: 'Failed update product',
      });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const result = await ProductsModel.findByIdAndDelete(req.params.id);

      res.status(200).json({
        data: result,
        message: 'Success delete product',
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: 'Failed delete product',
      });
    }
  },
};
