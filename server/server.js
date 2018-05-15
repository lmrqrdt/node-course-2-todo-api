require('./config/config');

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {ToDo} = require('./models/todos');
const {User} = require('./models/users');
const {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT;

let app = express();

app.use(bodyParser.json());

app.post('/todos', authenticate, async (req, res) => {

  const text1 = (req.body && req.body.text) || '';

  if (typeof text1 !== 'string' || text1.length === 0) {
    return res.status(400).send();
  };

  try {
    const todo = new ToDo ({
      text: text1,
      _creator: req.user._id
    });
    const saveTodo = await todo.save();
    return res.send(saveTodo);

  } catch (e) {
    console.log('There was an error attempting to save a new todo', e);
    return res.status(500).send();
  }

  // // this code is equal to above without async await
  // const todo = new ToDo ({
  //   text: req.body.text,
  //   _creator: req.user._id
  // });
  //
  // todo.save().then((doc) => {
  //   res.send(doc);
  // }, (e) => {
  //   res.status(400).send(e);
  // })
});

app.get('/todos', authenticate, async (req, res) => {
  try {
    const todos = await ToDo.find({
      _creator: req.user._id
    });
    res.send({todos});
  } catch (e) {
    res.status(400).send(e);
  }

  // this code is equivalent to the above w/o async await
  // ToDo.find({
  //   _creator: req.user._id
  // }).then((todos) => {
  //   res.send({todos})
  // }, (e) => {
  //   res.status(400).send(e);
  // });
});

app.get('/todos/:id', authenticate, async (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  try {
    const todo = await ToDo.findOne({
      _id: id,
      _creator: req.user._id
    })

    if (!todo) {
      return res.status(404).send();
    }
    return res.send({todo});
  } catch (e) {
    return res.status(404).send(e);
  }

    // this is the code w/o using async await
    // ToDo.findOne({
    //   _id: id,
    //   _creator: req.user._id
    // }).then((todo) => {
    //   if(!todo) {
    //     return res.status(404).send();
    //   }
    //     return res.send({todo});
    // }).catch((e) => res.status(404).send());
});

app.delete('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

try {
  const todo = await ToDo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  });
  if(!todo){
    return res.status(404).send();
  }

  res.send({todo});
} catch (e) {
  res.status(400)
}

  // the code above is equivalent to below but uses async await
    // ToDo.findOneAndRemove({
    //   _id: id,
    //   _creator: req.user._id
    // }).then((todo) => {
    //   if(!todo){
    //     return res.status(404).send();
    //   }
    //     res.send({todo});
    // }).catch((e) => res.status(400).send());
});

app.patch('/todos/:id', authenticate, async (req, res) => {
  let id = req.params.id;

  let body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
      body.completed = false;
      body.completedAt = null;
  }

  try {
    const todo = await ToDo.findOneAndUpdate({
      _id: id,
      _creator: req.user._id
    }, {$set: body}, {new: true});
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  } catch (e) {
    return res.status(404).send();
  }

  // ToDo.findOneAndUpdate({
  //   _id: id,
  //   _creator: req.user._id
  // }, {$set: body}, {new: true}).then((todo) => {
  //   if(!todo) {
  //     return res.status(404).send();
  //   }
  //
  //   res.send({todo});
  // }).catch((e) => {
  //   res.status(404).send();
  // })
});

app.post('/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User (body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }

  // this code is equal to the above but w/o async await
  // user.save().then(() => {
  //
  //   return user.generateAuthToken();
  // }).then((token) => {
  //   res.header('x-auth', token).send(user);
  // }).catch((e) => {
  //   res.status(400).send(e);
  // })
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', async (req, res) => {

  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user)
  } catch (e) {
    res.status(400).send();
  }

  // the code above is equalivalent to below but uses async await
  // let user = new User (body);
  // User.findByCredentials(body.email, body.password).then((user) => {
  //   return user.generateAuthToken().then((token) => {
  //     res.header('x-auth', token).send(user);
  //   })
  // }).catch((e) => {
  //   res.status(400).send();
  // });
});

app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token)
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
  }

  // this code is eqivalent to the above w/o async await
  // req.user.removeToken(req.token).then(() => {
  //   res.status(200).send();
  // }, () => {
  //   res.status(400).send();
  // });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
