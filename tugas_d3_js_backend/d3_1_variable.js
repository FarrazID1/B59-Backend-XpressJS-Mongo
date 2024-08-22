// 1) Variabel, Tipe Data, dan Operator -> variabel.js
// --Buat program yang mendemonstrasikan penggunaan variabel let, const, dan var.

//TODO: used data type: number
console.log('# define variable, then log it => type: number');
let a = 10;
console.log('- define let a = 10 -> a = 11 => log(a): ', a);
a = 11;
console.log('- new assignment, a = 11 => log(a): ', a);

var b = 30;
console.log('- define var b = 30 => log(b): ', b);
b = 29;
console.log('- new assignment, b = 29 => log(b): ', b);

const c = 20;
console.log('- define const b = 20 => log(b): ', c);
// c = 23;
// console.log('new assignment, b = 23 => log(b): ', c); // error: TypeError: Assignment to constant variable

//TODO: used data type: string, boolean, null, undefined, symbol
// --Buat program yang mencakup semua tipe data primitif dan non-primitif, serta menggunakan operator aritmatika dan perbandingan.
console.log(
  '# define some variables, then log it => type: string, boolean, null, undefined, symbol'
);
let greet = 'hello';
let isValid = true;
let isNull = null;
let isUndefined = undefined;
let symbol = Symbol('hello');
console.log(
  '- greet = "hello", isValid = true, isNull = null, isUndefined = undefined, symbol = Symbol("hello")'
);

//TODO: used data type: object
console.log('# define object & its properties, then log it');
let person = {
  name: 'Farraz',
  age: 30,
};
console.log(`- person.name = ${person.name}, person.age = ${person.age}`);

person.name = 'Sarmento';
person.age = 31;
console.log(
  `- edited => person.name = ${person.name}, person.age = ${person.age}`
);

//TODO: use arithmetical operator
console.log(
  '# define variable (type: number), then log it => use arithmetical operator'
);
let x = 16;
let y = 2;
console.log('- define x = 10, y = 20 => x + y): ', x + y);
console.log('- define x = 10, y = 20 => x - y): ', x - y);
console.log('- define x = 10, y = 20 => x * y): ', x * y);
console.log('- define x = 10, y = 20 => x / y): ', x / y);
console.log('- define x = 10, y = 20 => x % y): ', x % y);
console.log('- define x = 10, y = 20 => x ** y): ', x ** y);

//TODO: use comparison operator
console.log(
  '# define variable (type: number), then log it => use comparison operator'
);
console.log('- define x = 10, y = 20 =>  x == y): ', x == y);
console.log('- define x = 10, y = 20 =>  x != y): ', x != y);
console.log('- define x = 10, y = 20 =>  x === y): ', x === y);
console.log('- define x = 10, y = 20 =>  x !== y): ', x !== y);
console.log('- define x = 10, y = 20 =>  x > y): ', x > y);
console.log('- define x = 10, y = 20 =>  x >= y): ', x >= y);

//TODO: use logical operator
console.log(
  '# define variable (type: boolean), then log it => use logical operator'
);
console.log('- define x = true, y = false =>  x && y): ', x && y);
console.log('- define x = true, y = false =>  x || y): ', x || y);
console.log('- define x = true, y = false =>  !x): ', !x);
console.log('- define x = true, y = false =>  !y): ', !y);
