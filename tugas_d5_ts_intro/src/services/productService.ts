import { Product } from '../models/product';

export const addProduct = (
  products: Product[], //param.: products -- as an array of Product objects
  newProduct: Product //param.: newProduct -- as the new Product to be added - single object
): Product[] => {
  return [...products, newProduct];
  //? The new array is created by spreading the existing array - and adding the new product
};

//? This function 'removes' a product from an 'array' of products by its ID.
export const removeProduct = (
  products: Product[], //param.: products -- as an array of Product objects
  productId: number //param.: productId -- as the ID of the Product to be removed
): Product[] => {
  return products.filter((product) => product.id !== productId);
  //? The removal is done using the 'filter' method --> creates a new array with all elements
  //? --that pass the test implemented by function
  //? product.id !== productId --> meaning only products with IDs 'different from' the
  //? --specified productId (that has been deleted) are included in the new array.
};

export const updateProduct = (
  products: Product[],
  updatedProduct: Product
): Product[] => {
  return products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
};

export const getProducts = (products: Product[]): Product[] => {
  return products;
};
