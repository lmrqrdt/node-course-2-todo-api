let mongoose = require('mongoose');

let ToDo = mongoose.model('ToDo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {ToDo};

// let newToDo = new ToDo ({
//   text: 'Cook dinner'
// });
//
// newToDo.save().then((doc) => {
//   console.log('Saved ToDo', doc);
// }, (e) => {
//   console.log('Unable to save ToDo', e);
// });
