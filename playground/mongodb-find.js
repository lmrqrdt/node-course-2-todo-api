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

MongoClient.connect('mongodb://localhost:27017/ToDoApp01', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server!');
  }

  console.log('Connected to MongoDB server!');

  // db.collection('Todos01').find({completed: false}).toArray().then((docs) => {
  //   console.log('Todos01');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos01', err);
  // });

  // db.collection('Todos01').find({
  //   _id: new ObjectID('5a7f2de9f38e6408c0a923cd')
  // }).toArray().then((docs) => {
  //   console.log('Todos01');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos01', err);
  // });

  // db.collection('Todos01').find().count().then((count) => {
  //   console.log(`Todos01 count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch Todos01', err);
  // })

  db.collection('Users01').find({name: 'Larry'}).toArray().then((docs) => {
    console.log('Users01');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch Users', err);
  });

  // db.close();
});
