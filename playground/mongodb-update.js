
//const MongoClient = require('mongodb').MongoClient;
//code below is identical to that above using object destructuring with an additional
//object ObjectID

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp01', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server!');
  }

  console.log('Connected to MongoDB server!');

// db.collection('Todos01').findOneAndUpdate({_id: new ObjectID('5a9239bc236a0ae3c6bd1d72')}, {
//   $set: {completed: true
//   }
//   }, {
//     returnOriginal: false
// }).then((result) => {
//   console.log(result);
// });

db.collection('Users01').findOneAndUpdate({_id: new ObjectID('5a9b64a3fd61739ca713531d')}, {
  $set: {name: 'Larry'},
  $inc: {age: 5}
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
});


  // db.close();
});
