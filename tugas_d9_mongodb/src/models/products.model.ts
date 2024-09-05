import mongoose from 'mongoose';

//-- define 'schema' - it will be used by 'mongoose' to create 'model'
const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less than 1'],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories',
    },
  },
  {
    timestamps: true,
  }
);

const ProductsModel = mongoose.model('Products', ProductsSchema);

export default ProductsModel;
