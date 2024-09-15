export interface IPaginationQuery {
  page?: number; // ? for optional
  limit: number;
  search?: string; // ? for optional
}

//? NOTE: Tugas D11: Pagination Query
// - u/ mengoptimalkan hasil daftar produk dari endpoint: GET /products
// -- dengan memanfaatkan fitur query dari ExpressJS

//? it will be used in: 'products.controller.ts'
