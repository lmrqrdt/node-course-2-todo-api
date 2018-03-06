//const MongoClient = require('mongodb').MongoClient;
//code below is identical to that above using object destructuring with an additional
//object ObjectID

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp01', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server!');
  }

  console.log('Connected to MongoDB server!');

  // deleteMany
  // db.collection('Todos01').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos01').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos01').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // challenge: use deleteMany and findOneAndDelete on Users
  // db.collection('Users01').deleteMany({name: 'Larry'}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users01').findOneAndDelete({
    _id: new ObjectID('5a9b6629fd61739ca71353ca')
  }).then((results) => {
      console.log(JSON.stringify(results, undefined, 2));
  });

  // db.close();
});
