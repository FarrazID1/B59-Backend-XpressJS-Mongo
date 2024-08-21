// 3) Buat modul Node.js yang mengekspor fungsi untuk menjumlahkan dua angka,
// -- dan impor modul tersebut di file lain.

//TODO: using common.js --> module.exports
// define function (module): addition
function sum(a, b) {
  return a + b;
}

// define function (module): substract
function substract(a, b) {
  return a - b;
}

module.exports = { sum, substract };
