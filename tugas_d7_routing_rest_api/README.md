jalankan ''npm run dev'' di terminal

Test Rest API dengan postman:

1. GET http://localhost:3005/api/categories/ get all categories.
2. GET http://localhost:3005/api/categories/1 get category by id. (contoh ID 1).
3. POST http://localhost:3005/api/categories/ create new category.
4. PUT http://localhost:3005/api/categories/3 update category by id. (contoh mengganti data pada ID 3)
5. DELETE http://localhost:3005/api/categories/3 delete category by id. (comtoh menghapus ID 3)
6. GET http://localhost:3005/api/products?name=meja get product by name - use query string. (contoh name=meja)
7. GET http://localhost:3005/api/products/Elektronik?name=speaker get product by category (use parameter) & name (use query string).
   (contoh name=Speaker dalam kategori: Elektronik)
