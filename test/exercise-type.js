const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const ExerciseType = require('../models').ExerciseType;

chai.use(chaiHttp);

describe('ExerciseType', function() {
  beforeEach(function(done) {
    ExerciseType.destroy({ where: {} }).then(function() {
      done();
    });
  });

  describe('GET /exercise-types', function() {
    it('should list all exercise-types', function(done) {
      ExerciseType.create({ name: 'Test' }).then(function(newExerciseType) {
        chai.request(server)
          .get('/exercise-types')
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('exerciseType');
            res.body.exerciseType.should.be.a('array');
            res.body.exerciseType[0].should.have.property('id');
            res.body.exerciseType[0].should.have.property('name');
            res.body.exerciseType[0].should.have.property('createdAt');
            res.body.exerciseType[0].should.have.property('updatedAt');
            res.body.exerciseType[0].should.have.property('id').eql(newExerciseType.id);
            res.body.exerciseType[0].should.have.property('name').eql(newExerciseType.name);
            done();
          });
      });
    });
  });

  describe('GET /exercise-types/:id', function() {
    it('should get an exercise type with a given id', function(done) {
      ExerciseType.create({ name: 'Test' }).then(function(newExerciseType) {
        chai.request(server)
          .get(`/exercise-types/${newExerciseType.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('exerciseType');
            res.body.exerciseType.should.be.a('object');
            res.body.exerciseType.should.have.property('id');
            res.body.exerciseType.should.have.property('name');
            res.body.exerciseType.should.have.property('createdAt');
            res.body.exerciseType.should.have.property('updatedAt');
            res.body.exerciseType.should.have.property('id').eql(newExerciseType.id);
            res.body.exerciseType.should.have.property('name').eql(newExerciseType.name);
            done();
          });
      });
    });
  });

  describe('POST /exercise-types', function() {
    it('should add an exercise-type', function(done) {
      chai.request(server)
        .post('/exercise-types')
        .send({ name: 'Test' })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.should.have.property('createdAt');
          res.body.should.have.property('updatedAt');
          done();
        });
    });
  });
});
