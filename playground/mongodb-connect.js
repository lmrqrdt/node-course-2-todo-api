//const MongoClient = require('mongodb').MongoClient;
//code below is identical to that above using object destructuring with an additional
//object ObjectID

const {MongoClient, ObjectID} = require('mongodb');

// let obj = new ObjectID();
// console.log(obj);

// object destructuring lets you pull out properties from an object creating variables
// let  user = {name: 'Larry', age: 25};
// let {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server!');
  }

  console.log('Connected to MongoDB server!');


  // db.collection('Todos').insertOne({
  //   test: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)
//   db.collection('Users').insertOne({
//     name: 'Larry',
//     age: 65,
//     location: 'Pueblo, CO'
//   }, (err, result) => {
//     if(err) {
//       return console.log('Unable to insert document!');
//     }
//     console.log(result.ops[0]._id.getTimestamp());
//   })
//
  db.close();
});
