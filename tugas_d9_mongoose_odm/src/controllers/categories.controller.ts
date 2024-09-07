import { Request, Response } from 'express';
import CategoryModel from '../models/categories.model';

export default {
  async create(req: Request, res: Response) {
    try {
      const result = await CategoryModel.create(req.body);
      res.status(201).json({
        data: result,
        message: 'Success create category',
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: 'Failed create category',
      });
    }
  },
  async findAll(req: Request, res: Response) {
    try {
      const result = await CategoryModel.find();
      res.status(200).json({
        data: result,
        message: 'Success get all categories',
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: 'Failed get all categories',
      });
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      const result = await CategoryModel.findById(req.params.id);

      res.status(200).json({
        data: result,
        message: 'Success get one category',
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: 'Failed get one category',
      });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const result = await CategoryModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(200).json({
        data: result,
        message: 'Success update category',
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: 'Failed update category',
      });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const result = await CategoryModel.findByIdAndDelete(req.params.id);

      res.status(200).json({
        data: result,
        message: 'Success delete category',
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: 'Failed delete category',
      });
    }
  },
};
