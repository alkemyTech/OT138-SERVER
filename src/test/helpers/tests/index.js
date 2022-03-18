const { expect} = require("chai");

export const testIfNotLogged = (res) => {
    errorFlag(res, "AUT001", "401");
}

export const testIfNotAdmin = (res) => {
    errorFlag(res, "AUT002", "403");
}

export const testIfBodyValidationError = (res) => {
    errorFlag(res, "VAL001", "400");
}

export const testIfEmptyBody = (res) => {
    errorFlag(res, "REQ002", "400");
}

export const testIfNoResults = (res) => {
    errorFlag(res, "REQ001", "404");
}

export const testIfParamsValidationError = (res) => {
    errorFlag(res, "REQ002", "400");
}

export const testIfSuccess = (res) => {
    it("should return an success response object if no error", async () => {
        res.should.be.a('object');
        res.status.should.be.equal(200);
        res.body.should.have.property("error");
        res.body.should.have.property("status");
        res.body.error.should.be.equal(false);
    })
}

export const errorFlag = (res, errorCode, status) => {
    res.should.be.a('object');
    res.status.should.be.equal(200);
    res.body.should.have.property("error");
    res.body.should.have.property("errorCode");
    res.body.should.have.property("status");
    res.body.error.should.be.equal(true);
    res.body.errorCode.should.be.equal(errorCode);
    res.body.status.should.be.equal(status);
    res.body.message.should.be.a('string');
}

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