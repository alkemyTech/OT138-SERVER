const { expect} = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const { User, Contacts, Role } = require("../models");
const {standardResponseTest} = require("./helpers/tests");

chai.use(chaiHttp);
chai.use(require('chai-things'));

async function authenticateUser(email, password) {
  const res = await chai
    .request(server)
    .post("/api/auth/login")
    .send({ email, password });
  return res.body.result.accessToken;
}

async function createContactsData(){
  let seedData = [];
  for (let i = 0; i < 20; i++) {
    //create 20 contacts
    seedData.push({
      name: "name",
      phone: "941218551",
      email: "Test@email.com",
      message: i % 3 != 0 ? "This is a message" : null, // 1 every 3 will not have a message
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return Contacts.bulkCreate(seedData);
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


describe("Contact endpoint /POST tests:", () => {
  it("Should return and error response if sent fields do not correspond to correct schema.", async () => {
    const res = await chai.request(server).post("/api/contacts").send({});
    standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be VAL001").to.equal("VAL001");
  });

  it("Should return an error if an extra field is present.", async () => {
    const res = await chai.request(server).post("/api/contacts").send(testData1);
    standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be VAL001").to.equal("VAL001");
  });

  it("Should return an error if a required field is missing (name or email).", async () => {
    const res = await chai.request(server).post("/api/contacts").send(testData2);
    standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be VAL001").to.equal("VAL001");
  });

  it("Should return an error if a email field is not a valid email.", async () => {
    const res = await chai.request(server).post("/api/contacts").send(testData2);
    standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be VAL001").to.equal("VAL001");
  });

  it("Should return a success response if all fields are present.", async () => {
    const res = await chai.request(server).post("/api/contacts").send(testData4);
    standardResponseTest(res, false);
  });
});

describe("Contact endpoint /get tests:", () => {
  const EMAIL = "test@email.com";
  const PASSWORD = "test1234";
  let accessToken= "";
  before(async () => {
    // create admin role
    const adminRole = await Role.create({
      name: "Admin",
    });
    // create user
    await chai.request(server).post("/api/auth/register").send({
      firstName: "Test",
      lastName: "User",
      email: EMAIL,
      password: PASSWORD,
    });
    // Change role to role Id 1 (admin)
    const userInstance = await User.findOne({ where: { email: EMAIL } });
    userInstance.roleId = adminRole.id;
    await userInstance.save();
    // Get Access Token
    accessToken = await authenticateUser(EMAIL, PASSWORD);
    // create contacts
    await createContactsData();
    //check number of contacts must be >= than 10 for test
    const numberOfContacts = await Contacts.count();
    if(numberOfContacts < 10){
      throw new Error(`Number of contacts = ${numberOfContacts}, is less than 10, can't perform tests.`);
    } else{
      console.log("Number of contacts: ", numberOfContacts);
    }
  });

  after(async () => {
    // Wipe DB
    await User.destroy({
        where: {},
        force: true
      });
    await Role.destroy({
      where: {},
      force: true
    });
    await Contacts.destroy({
      where: {},
      force: true
    });
  });

  it("Should return error if no token is present.", async () => {
    const res = await chai.request(server).get("/api/contacts");
    standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be AUT001").to.equal("AUT001");
  });

  it("Should return error if invalid token is present.", async () => {
    const res = await chai.request(server).get("/api/contacts").set("Authorization", `Bearer invalidToken`);
    standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be AUT001").to.equal("AUT001");
  });

  it("Should return an error if page query params is not a number", async () =>{
    const res = await chai.request(server).get("/api/contacts?page=notANumber").set("Authorization", `Bearer ${accessToken}`);
    standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be REQ002").to.equal("REQ002");
    expect(res.body.status, "status should be 400").to.equal("400");
  })

  it("Should return an error if limit query params is not a number", async () =>{
    const res = await chai.request(server).get("/api/contacts?limit=notANumber").set("Authorization", `Bearer ${accessToken}`);
    standardResponseTest(res, true);
    expect(res.body.errorCode, "errorCode should be REQ002").to.equal("REQ002");
    expect(res.body.status, "status should be 400").to.equal("400");
  })

  it("Should return list of contacts if no query params are present.", async () => {
    const res = await chai.request(server).get("/api/contacts").set("Authorization", `Bearer ${accessToken}`);
    standardResponseTest(res, false);
    expect (res.body, "Response should have property 'result'").to.have.property("result");
    const result = res.body.result;
    expect (result, "Result should have property 'items'").to.have.property("items");
    expect (result, "Result should have property 'count'").to.have.property("count");
    expect (result, "Result should have property 'pages'").to.have.property("pages");
    expect (result.items, "Items should be an array").to.be.an("array");
    expect (result.items, "Items should have property id").all.have.property("id");
    expect (result.items, "Items should have property name").all.have.property("name");
    expect (result.items, "Items should have property phone").all.have.property("phone");
    expect (result.items, "Items should have property email").all.have.property("email");
    expect (result.items, "Items should have property message").all.have.property("message");
  });

  it("Should return list of contacts if query params are present.", async () => {
    const limit = 3;
    const page = 2;
    const res = await chai.request(server).get(`/api/contacts?limit=${limit}&page=${page}`).set("Authorization", `Bearer ${accessToken}`);
    standardResponseTest(res, false);
    expect (res.body, "Response should have property 'result'").to.have.property("result");
    const result = res.body.result;
    expect (result, "Result should have property 'items'").to.have.property("items");
    expect (result, "Result should have property 'count'").to.have.property("count",limit);
    expect (result, "Result should have property 'pages'").to.have.property("pages");
    expect (result, "Result should have property 'previous'").to.have.property("previous");
    expect (result, "Result should have property 'next'").to.have.property("next");
    expect (result.items, "Items should be an array").to.be.an("array");
    expect (result.items, "Items should have a length equal to limit").to.have.lengthOf(limit);
    expect (result.items, "Items should have property id").all.have.property("id");
    expect (result.items, "Items should have property name").all.have.property("name");
    expect (result.items, "Items should have property phone").all.have.property("phone");
    expect (result.items, "Items should have property email").all.have.property("email");
    expect (result.items, "Items should have property message").all.have.property("message");
  });

});
