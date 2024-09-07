import mongoose from 'mongoose';

//-- define 'schema' - it will be used by 'mongoose' to create 'model'
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CategoriesModel = mongoose.model('CategoryId', CategoriesSchema);

export default CategoriesModel;
