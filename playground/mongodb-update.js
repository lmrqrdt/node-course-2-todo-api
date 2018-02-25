//const MongoClient = require('mongodb').MongoClient;
//code below is identical to that above using object destructuring with an additional
//object ObjectID

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server!');
  }

  console.log('Connected to MongoDB server!');

// db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5a9239bc236a0ae3c6bd1d72')}, {
//   $set: {completed: true
//   }
//   }, {
//     returnOriginal: false
// }).then((result) => {
//   console.log(result);
// });

db.collection('Users').findOneAndUpdate({_id: new ObjectID('5a7f302b07a0de2f64535f7b')}, {
  $set: {name: 'Larry'},
  $inc: {age: 5}
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
});


  // db.close();
});
