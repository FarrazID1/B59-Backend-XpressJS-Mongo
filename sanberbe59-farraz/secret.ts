import crypto from 'crypto';
// const crypto = require('crypto');

const secret: string = crypto.randomBytes(16).toString('hex');
console.log(secret);
