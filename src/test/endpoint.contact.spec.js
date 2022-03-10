const { expect, assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { async } = require("regenerator-runtime");
const server = require("../app");
const { User } = require('../models');

chai.use(chaiHttp);

async function authenticateUser(email, password) {
  const res = await chai.request(server).post('/api/auth/login').send({ email, password });
  return res.body.accessToken;
}

const testData1 = {
  name: "Test Name",
  email: "test@email.com",
  phone: "Test Phone",
  message: "Test message",
  otherField: "Other Field",
};

const testData2 = {
  email: "test@email.com",
  phone: "Test Phone",
  message: "Test message",
};
const testData3 = {
  name: "Test Name",
  email: "testEmail.com",
  phone: "Test Phone",
  message: "Test message",
};

const testData4 = {
  name: "Test Name",
  email: "test@email.com",
  phone: "Test Phone",
  message: "Test message",
};


function standardResponseTest(res, testForError){
  expect(res.status, "Status code should be 200").to.equal(200);
  expect(res.body, "Response body should be an object").to.be.a("object");
  expect(res.body,'Response body should include the property "error"').to.have.property("error");
  expect(res.body, "Response body should have the property 'status'" ).to.have.property("status");
  if (testForError){
    expect(res.body.error, "error should be set to true").to.equal(true);
    expect(res.body, 'Response body should include the property "errorCode"').to.have.property("errorCode");
  }else {
    expect(res.body.error, "error should be set to false").to.equal(false);
    expect(res.body.status, "Property status should be '200'").to.equal("200");
  }
}

describe("Contact endpoint /POST tests:", () => {
  it("Should return and error response if sent fields do not correspond to correct schema.", async () => {
    const res = await chai.request(server).post("/api/contacts").send({});
    standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be VAL001").to.equal("VAL001");
  });

  it("Should return an error if an extra field is present.", async () => {
    const res = await chai
      .request(server)
      .post("/api/contacts")
      .send(testData1);
      standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be VAL001").to.equal("VAL001");
  });

  it("Should return an error if a required field is missing (name or email).", async () => {
    const res = await chai
      .request(server)
      .post("/api/contacts")
      .send(testData2);
      standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be VAL001").to.equal("VAL001");
  });

  it("Should return an error if a email field is not a valid email.", async () => {
    const res = await chai
      .request(server)
      .post("/api/contacts")
      .send(testData2);
      standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be VAL001").to.equal("VAL001");
  });

  it("Should return a success response if all fields are present.", async () => {
    const res = await chai
      .request(server)
      .post("/api/contacts")
      .send(testData4);
      standardResponseTest(res, false);
  });
});

describe("Contact endpoint /get tests:", () => {
  const EMAIL = "test@email.com"
  const PASSWORD = "di4id34n7"
  before(async () => {
    await chai.request(server).post('/api/auth/register').send({
        firstName: 'Test',
        lastName: 'User',
        email: EMAIL,
        password: PASSWORD
    });
  });

after(async () => {
  await User.destroy({
      where: {email: EMAIL},
      force: true
    });
  });

  it("Should return error if no token is present.", async () => {
    const res = await chai.request(server).get("/api/contacts");
    standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be AUT001").to.equal("AUT001");
  });

  it("Should return error if invalid token is present.", async () => {
    const res = await chai.request(server).get("/api/contacts").set('Authorization', `Bearer invalidToken`);
    console.log(res.body);
    standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be AUT001").to.equal("AUT001");
  });

  it("Should return list of contacts.", async () => {
    const accessToken = await authenticateUser(EMAIL, PASSWORD);
    const res = await chai.request(server).get("/api/contacts").set('Authorization', `Bearer ${accessToken}`);
    console.log(res.body);
    standardResponseTest(res, false);
  });
});
