import mongoose from 'mongoose';

//TODO: define schema for products model - it will be used by mongoose
//? --schema will be used to define document structure (req.body) - in JSON format
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
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CategoryId',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductsModel = mongoose.model('Products', ProductsSchema);

export default ProductsModel;
