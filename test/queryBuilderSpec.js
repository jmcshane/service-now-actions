var chai = require('chai');
var QueryBuilder = require('../src/QueryBuilder.js')
var should = chai.should();
var expect = chai.expect;

describe('test query builder functionality', function(value) {
  describe('Verify constructor', function() {
    it('constructor creates empty query', function() {
      var qb = new QueryBuilder();
      expect(qb.encodeQuery()).to.be.empty;
    });
  });
  describe('Order by works as expected', function() {
    it('no second arg is ascending', function() {
      var qb = new QueryBuilder();
      qb.addOrderBy("sys_created_on");
      expect(qb.encodeQuery()).to.equal("ORDERBYsys_created_on");
    });
    it('second arg true means descending', function() {
      var qb = new QueryBuilder();
      qb.addOrderBy("number", true);
      expect(qb.encodeQuery()).to.equal("ORDERBYDESCnumber");
    });
    it('can order multiple fields', function() {
      var qb = new QueryBuilder();
      qb.addOrderBy("priority");
      qb.addOrderBy("number", true);
      expect(qb.encodeQuery()).to.equal("ORDERBYpriority^ORDERBYDESCnumber");
    })
  });
  describe('Validate key addition', function() {
    it('can add an arbitrary field', function() {
      var qb = new QueryBuilder();
      qb.addQueryParam("column", "value");
      expect(qb.encodeQuery()).to.equal("column=value");
    });
    it('can add multiple fields', function() {
      var qb = new QueryBuilder();
      qb.addQueryParam("column", "value");
      qb.addQueryParam("second_column", "second_value");
      expect(qb.encodeQuery()).to.equal("column=value^second_column=second_value");
    });
    it('will write query parameters first, then order parameters in order', function() {
      var qb = new QueryBuilder();
      qb.addQueryParam("column", "value");
      qb.addOrderBy("priority");
      qb.addQueryParam("second_column", "second_value");
      qb.addOrderBy("number", true);
      expect(qb.encodeQuery()).to.equal("column=value^second_column=second_value^ORDERBYpriority^ORDERBYDESCnumber");  
    })
  });
});
