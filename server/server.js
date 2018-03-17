const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {ToDo} = require('./models/todos');
const {User} = require('./models/users');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new ToDo ({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos', (req, res) => {
  ToDo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

    ToDo.findById(id).then((todo) => {
      if(!todo) {
        return res.status(404).send();
      }
        return res.send({todo});
    }).catch((e) => res.status(400).send());
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
