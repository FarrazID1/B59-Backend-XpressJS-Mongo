import mongoose, { Types } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  images: string[];
  price: number;
  qty: number;
  slug: string;
  categoryId: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
  _id?: Types.ObjectId;
}

const Schema = mongoose.Schema;

const ProductsSchema = new Schema<IProduct>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    images: {
      type: [Schema.Types.String],
      required: true,
    },
    price: {
      type: Schema.Types.Number,
      required: true,
    },
    qty: {
      type: Schema.Types.Number,
      required: true,
      min: [1, '"Quantity can not be less than 1'],
    },
    slug: {
      type: Schema.Types.String,
      unique: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Categories',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//? Mongoose middleware
ProductsSchema.pre('save', function (next) {
  const product = this;

  product.slug = product.name.toLowerCase().split(' ').join('-');
  next();
});

//TODO: by mongoose => create 'model' based on 'schema'
const ProductsModel = mongoose.model('Products', ProductsSchema);
//? it will create 'Products' collection (model) in database (MongoDB)

export default ProductsModel;
