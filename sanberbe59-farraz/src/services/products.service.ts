import ProductsModel, { IProduct } from '../models/products.model';

//TODO: --define business logic here (query CRUD): create, findAll, findOne, update, remove
export const create = async (payload: IProduct): Promise<IProduct> => {
  //? argumen > payload - data yang dikirimkan ==> req.body
  const result = await ProductsModel.create(payload);
  return result;
};
export const findAll = async (
  query: any,
  limit: number = 10,
  page: number = 1
): Promise<IProduct[]> => {
  const result = await ProductsModel.find(query)
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: 1 }) // -1 = descending, 1 = ascending
    .populate('categoryId');
  return result;
};

export const findOne = async (id: string): Promise<IProduct | null> => {
  // Cek apakah sudah ada product dengan 'Id' yang hendak dibuat
  const result = await ProductsModel.findById(id);
  return result;
};

export const update = async (
  id: string,
  payload: IProduct
): Promise<IProduct | null> => {
  const result = await ProductsModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const remove = async (id: string): Promise<IProduct | null> => {
  const result = await ProductsModel.findOneAndDelete({ _id: id });
  return result;
};
