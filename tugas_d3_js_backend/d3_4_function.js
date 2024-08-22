// 4) Function -> math.js
// --Buat fungsi yang menghitung luas lingkaran berdasarkan jari-jari yang diberikan.

const prompt = require('prompt-sync')({ sigint: true });
let radius = parseInt(prompt('Enter the radius of the circle: '));

function areaOfCircle(radius) {
  return Math.PI * radius * radius;
}

console.log(`The area of the circle is: ${areaOfCircle(radius)}`);

// --Buat fungsi yang menerima array angka dan mengembalikan array baru dengan angka-angka yang dikuadratkan.
console.log('# use map to square an array data');
console.log('- array => dataX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]');
const dataX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function squareArray(dataX) {
  return dataX.map((value) => value * value);
}

console.log(`- square of dataX: `, squareArray(dataX));
