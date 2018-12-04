require('./config/config');

const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {mongoose} = require('./db/mongoose');
const {ToDo} = require('./models/todos');
const {User} = require('./models/users');
const {authenticate} = require('./middleware/authenticate');

const port = process.env.PORT;

let app = express();
app.use(cors());

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  let todo = new ToDo ({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos', authenticate, (req, res) => {
  ToDo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

    ToDo.findOne({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {
      if(!todo) {
        return res.status(404).send();
      }
        return res.send({todo});
    }).catch((e) => res.status(404).send());
});

app.delete('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

    ToDo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {
      if(!todo){
        return res.status(404).send();
      }
        res.send({todo});
    }).catch((e) => res.status(400).send());
});

app.patch('/todos/:id', authenticate, (req, res) => {
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

  ToDo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(404).send();
  })
});

app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User (body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {

  let body = _.pick(req.body, ['email', 'password']);
  let user = new User (body);

  User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
      res.header('Access-Control-Expose-Headers', 'x-auth').header('x-auth', token).send(user);
    })
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.delete('/users/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  User.findOneAndRemove({
    _id: id,
  }).then((user) => {
    if(!user){
      return res.status(404).send();
    }
      res.send({user});
  }).catch((e) => res.status(400).send());
})

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {app};
