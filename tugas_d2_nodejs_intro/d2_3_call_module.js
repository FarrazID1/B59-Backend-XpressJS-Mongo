// 3) Buat modul Node.js yang mengekspor fungsi untuk menjumlahkan dua angka,
// -- dan impor modul tersebut di file lain.

const myModule1 = require('./d2_3_define_module1');
const myModule2 = require('./d2_3_define_module2');

console.log('sum of 2 + 3 is: ', myModule1.sum(2, 3));
console.log('substract of 7 - 3 is: ', myModule1.substract(7, 3));

console.log('multiply of 2 * 3 is: ', myModule2.multiply(2, 3));
console.log('divide of 7 / 3 is: ', myModule2.divide(7, 3));
