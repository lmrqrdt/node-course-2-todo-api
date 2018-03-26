const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {ToDo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');

// ToDo.remove({}).then((result) => {
//   console.log(result);
// });

// ToDo.findOneAndRemove()
// ToDo.findByIdAndRemove()

// ToDo.findOneAndRemove({_id: '5ab91cace0646ad5e1a448c8'}).then((todo) => {
//   console.log(todo);
// });

ToDo.findByIdAndRemove('5ab91cace0646ad5e1a448c8').then((todo) => {
  console.log(todo);
});
