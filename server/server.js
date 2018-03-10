let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {ToDo} = require('./models/todos');
let {User} = require('./models/users');

let app = express();

app.listen(3000, () => {
  console.log('Started on port 3000');
});

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

module.exports = {app};
