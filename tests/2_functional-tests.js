/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({title: 'Title'})
        .end((err,res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'returned should be an object')
          assert.equal(res.body.title, 'Title');
          assert.isArray(res.body.comments, 'comments should be inside an array');
          assert.typeOf(res.body._id, 'string');
          done()
        })
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({title: ''})
        .end((err,res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'missing title');
          done();
        })
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .query({})
        .end((err,res)=>{
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'all books object should be in an array');
          assert.notProperty(res.body[0], 'comments');
          done();
        })
      });      
      
    });
    
    suite('DELETE /api/books => success msg', function(){
      
      test('Test DELETE /api/books',  function(done){
        chai.request(server)
        .delete('/api/books')
        .end((err,res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.text, 'complete delete successfull');
          done();
        })
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/5b792ba2215b140052ceeece')
        .end((err,res)=>{
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no book exists');
          done();
        })
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        .get('/api/books/5b797e4979fdb8332a69bd31')
        .end((err,res)=>{
          assert.equal(res.status, 200);
          assert.isArray(res.body.comments);
          done();
        })
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
        .post('/api/books/5b797e4979fdb8332a69bd31')
        .send({comment: 'great book'})
        .end((err,res) => {
          assert.equal(res.status, 200);
          done();
        })
      });
      
    });
    
    suite('DELETE /api/books/[id] => send successful delete msg', function(){
      
      test('Test DELETE /api/books/[id] ', function(done){
        chai.request(server)
        .delete('/api/books/5b797e4979fdb8332a69bd31')
        .end((err,res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'delete successful');
          done();
        })
      });
      
    });

  });

});
