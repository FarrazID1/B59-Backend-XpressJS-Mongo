"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.updateProduct = exports.removeProduct = exports.addProduct = void 0;
const addProduct = (products, //param.: products -- as an array of Product objects
newProduct //param.: newProduct -- as the new Product to be added - single object
) => {
    return [...products, newProduct];
    //? The new array is created by spreading the existing array - and adding the new product
};
exports.addProduct = addProduct;
//? This function 'removes' a product from an 'array' of products by its ID.
const removeProduct = (products, //param.: products -- as an array of Product objects
productId //param.: productId -- as the ID of the Product to be removed
) => {
    return products.filter((product) => product.id !== productId);
    //? The removal is done using the 'filter' method --> creates a new array with all elements
    //? --that pass the test implemented by function
    //? product.id !== productId --> meaning only products with IDs 'different from' the
    //? --specified productId (that has been deleted) are included in the new array.
};
exports.removeProduct = removeProduct;
const updateProduct = (products, updatedProduct) => {
    return products.map((product) => product.id === updatedProduct.id ? updatedProduct : product);
};
exports.updateProduct = updateProduct;
const getProducts = (products) => {
    return products;
};
exports.getProducts = getProducts;
