//? client (browser/postman) -> [routes]: api.ts
//! since Tugas_D10 - (updated): we use the flow:
//? --[routes] -> [controllers] -> [service] -> [model] <---> {database}

import express from 'express';

import productsController from '../controllers/products.controller';
import categoriesController from '../controllers/categories.controller';
import uploadController from '../controllers/upload.controller';
import uploadMiddleware from '../middlewares/upload.middleware';

//TODO: Tugas D13 - (updated): 1) JWT Middleware
// - u/ mengoptimalkan fitur login dan register
import authController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

//TODO: Tugas D13 - (updated): 2) routes => authentications
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
// router.post('/auth/me', authMiddleware, authController.me);
router.get('/auth/me', authMiddleware, authController.me);
router.put(
  '/auth/update-profile',
  authMiddleware,
  authController.updateProfile
);

//? test URL 1:  {base_url}/auth/register  => register - 2 new user
//? test URL 2:  {base_url}/auth/login => then, login with one of them

// routes => categories
router.post('/categories', categoriesController.create);
router.get('/categories', categoriesController.findAll);
router.get('/categories/:id', categoriesController.findOne);
router.put('/categories/:id', categoriesController.update);
router.delete('/categories/:id', categoriesController.delete);

//TODO: Tugas D11 - (updated): use pagination
//? test URL:  {base_url}/categories/:id -> parameter
//? test URL:  {base_url}/categories?page=1&limit=10&search=kemeja -> query url

// routes => products
router.get('/products', productsController.findAll);
//? get all products - with / without pagination -> defined in 'controller'
router.post('/products', productsController.create);
router.get('/products/:id', productsController.findOne);
router.put('/products/:id', productsController.update);
router.delete('/products/:id', productsController.delete);

//? NEXT, we will add route - to uplaod image
// router.post("/products/upload", uploadImagesMiddleware.single, productsController.createSingle);
// router.post("/products/uploads", uploadImagesMiddleware.multiple, productsController.createMultiple);

// routes => upload image
router.post('/upload', uploadMiddleware.single, uploadController.single);
router.post('/uploads', uploadMiddleware.multiple, uploadController.multiple);

export default router;
