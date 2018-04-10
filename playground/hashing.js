const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!'

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });

let hashedPassword = '$2a$10$fTsPnW2QsFwyeL4.rbqi5ecmp3ut1EF/6B/Lj/Rgw8JdUFwGFPYli';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// let data = {
//   id: 10
// };
//
// let token = jwt.sign(data, 'randomSaltValue')
// console.log(token);
//
// var decoded = jwt.verify(token, 'randomSaltValue');
// console.log('decoded', decoded);

// let message = 'I am user number 3';
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// let data = {
//   id: 4
// };
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'randomSaltValue').toString()
// }
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'randomSaltValue').toString();
//
// if(resultHash === token.hash) {
//   console.log('Data was not changed.');
// } else {
//   console.log('Data was changed. Do not trust!');
// }
