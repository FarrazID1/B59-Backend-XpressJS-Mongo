//TODO: 1) add to import 'Types'
import mongoose, { Types } from 'mongoose';

//? [routes] -> [controllers] -> [service] -> [model] <---> {database}

export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
  // description: string;
  createdAt: string;
  updatedAt: string;
}

const Schema = mongoose.Schema;
const CategoriesSchema = new Schema<ICategory>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//TODO: by mongoose => create 'model' based on 'schema'
const CategoriesModel = mongoose.model('Categories', CategoriesSchema);
//? it will create 'Category' collection in database (MongoDB)'

export default CategoriesModel;
