const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {ToDo} = require('./../models/todos');

const todos01 = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

beforeEach((done) => {
  ToDo.remove({}).then(() => {
    return ToDo.insertMany(todos01);
  }).then(() => done())
});

describe('POST /todos', () => {

  it('should create a new todo', (done) => {
    let text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        ToDo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

    it('should not create a todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
          if(err) {
            return done(err);
          }

      ToDo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e))
    });
  });
});

describe('/GET todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done);
  });
});

describe('/GET todos:id', () => {
  let hexID = todos01[1]._id.toHexString();

  it('should return a todos doc', (done) => {
    request(app)
      .get(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos01[1].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    let hexID = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexID}`)
      .expect(404)
      .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
      request(app)
        .get('/todos/123')
        .expect(404)
        .end(done);
      });
});

describe('/DELETE todos01:id', () => {
  let hexId = todos01[1]._id.toHexString();

  it('should remove a todos', (done) => {
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

      ToDo.findById(hexId).then((todo) => {
        expect(todo).toBe(null);
        done();
      }).catch((e) => done(e))
      });
    });
    it('should return 404 if todo not found', (done) => {
      let hexId = new ObjectID().toHexString();

      request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);

      });

    it('should return 404 if ObjectID not valid', (done) => {
      request(app)
        .delete('/todos/123')
        .expect(404)
        .end(done);
    });
});
