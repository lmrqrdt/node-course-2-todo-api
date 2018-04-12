const {ObjectID} = require('mongodb');

const {ToDo} = require('./../../models/todos');
const {User} = require('./../../models/users');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'larrym82@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'randomSeedValue').toString()
  }]
},{
  _id: userTwoId,
  email: 'larrym83@example.com',
  password: 'userTwoPass'
}]

const todos01 = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

const populateToDos = (done) => {
  ToDo.remove({}).then(() => {
    return ToDo.insertMany(todos01);
  }).then(() => done())
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {todos01, populateToDos, users, populateUsers};
