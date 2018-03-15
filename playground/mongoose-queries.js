const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {ToDo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');

let id = '5a9cb36f3acb881afcacde6f';

// if(!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// };

// ToDo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// ToDo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// ToDo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('ID not found');
//   }
//   console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));

User.findById(id).then((users) => {
  if(!users) {
    return console.log('Unable to find user');
  }
  console.log(JSON.stringify(users, undefined, 2));
}).catch((e) => console.log('User ID not valid'));
