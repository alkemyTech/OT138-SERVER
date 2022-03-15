const { expect} = require("chai");

/**
 * Test for the standard response object.
 * @param {object} res response object form the endpoint
 * @param {boolean} testForError If testing for a error response set to true
 */

export function standardResponseTest(res, testForError) {
  expect(res.status, "Status code should be 200").to.equal(200);
  expect(res.body, "Response body should be an object").to.be.a("object");
  expect(res.body, 'Response body should include the property "error"').to.have.property("error");
  expect(res.body, "Response body should have the property 'status'").to.have.property("status");
  if (testForError) {
    expect(res.body.error, "error should be set to true").to.equal(true);
    expect(res.body, 'Response body should include the property "errorCode"').to.have.property("errorCode");
  } else {
    expect(res.body.error, "error should be set to false").to.equal(false);
    expect(res.body.status, "Property status should be '200'").to.equal("200");
  }
}