import CategoryModel, { ICategory } from '../models/categories.model';

export const create = async (payload: ICategory): Promise<ICategory> => {
  const result = await CategoryModel.create(payload);
  return result;
};

export const findAll = async (): Promise<ICategory[]> => {
  const result = await CategoryModel.find();
  return result;
};

// function: findOne -- find a category by id
export const findOne = async (id: string): Promise<ICategory | null> => {
  const result = await CategoryModel.findById(id);
  return result;
};

// function: update -- update a category by id
export const update = async (
  id: string,
  payload: ICategory
): Promise<ICategory | null> => {
  const result = await CategoryModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// function: remove -- remove a category by id
export const remove = async (id: string): Promise<ICategory | null> => {
  const result = await CategoryModel.findOneAndDelete({ _id: id });
  return result;
};
