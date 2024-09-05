//TODO: import 'mongoose' and 'Schema'
import mongoose from 'mongoose';

//-- define 'schema' - it will be used by 'mongoose' to create 'model'
const Schema = mongoose.Schema;

//schema will be used to define document structure (req.body) - in JSON format
//-- in req.body (Postman) => {name: 'name', description: 'description'}
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

const CategoriesModel = mongoose.model('Categories', CategoriesSchema);

export default CategoriesModel;
