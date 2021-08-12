// dependencies
const should = require('should');
const request = require('request');
const { expect } = require('chai');
const util = require('util');

const baseUrl = 'http://localhost:3000';

describe('Api tasks', () => {
  // test for get method

  it('should get all the items', async (done) => {
    request.get({ url: `${baseUrl}/items` }, (error, response, body) => {
      const bodyObj = JSON.parse(body);
      console.log(bodyObj);
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

// test for get by id method
// test for delete method
// test for post method
// test for patch method
