const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)
.then (() => {
    console.log('Connected to database!')
  }).catch((e) => {
    console.log(e);
    console.log('Connection to database failed!');
  });

module.exports = {mongoose};
