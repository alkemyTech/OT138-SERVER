import { faker } from '@faker-js/faker';
import { expect } from 'chai';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const { Member } = require('../models');
const {
  standardResponseTest,
  testIfNotLogged,
  testIfNotAdmin,
  testIfValidationError,
  testIfNoResults,
  testIfSuccess
} = require('./helpers/tests');
const { createUsersAndRoles, authenticateUser, authenticateAdmin } = require('./helpers/auth');
const should = chai.should();

chai.use(chaiHttp);

describe("Members endpoints", async () => {

  before(async () => {
    await _deleteAllMembers();
    await createUsersAndRoles();
  });

  after(async () => {
    await _deleteAllMembers();
  });

  describe("/GET /members", async () => {

    afterEach(async () => {
      await _deleteAllMembers();
    });

    it("should return an empty list of members", async () => {
      const res = await chai.request(server).get('/api/members');
      standardResponseTest(res, false);
      expect(res.body, 'Response does does not include property "result"').to.have.property('result');
      expect(res.body.result, 'Response "result" object should include the property "items"').to.have.property('items');
      expect(res.body.result.items, 'result.items is not empty').to.be.empty();
    });

    it("should return a list with two members", async () => {
      const now = new Date();
      await Member.bulkCreate([
        {
          name: 'Member 1',
          image: 'https://image.com/1234.png',
          createdAt: now,
          updatedAt: now
        },
        {
          name: 'Member 2',
          image: 'https://image.com/1234.png',
          createdAt: now,
          updatedAt: now
        }
      ])

      const res = await chai.request(server).get('/api/members');
      standardResponseTest(res, false);
      expect(res.body, 'Response does does not include property "result"').to.have.property('result');
      expect(res.body.result, 'Response "result" object should include the property "items"').to.have.property('items');
      expect(res.body.result.items, 'result.items does not contain two items').to.have.lengthOf(2);
    });
  });

  describe("/POST /members", async () => {

    afterEach(async () => {
      await _deleteAllMembers();
    });

    it("should return an error if sender is not authenticated", async () => {
      const res = await chai.request(server).post('/api/members', {});

      testIfNotLogged(res);
    });

    it("should return an error if sender does not have Admin role", async () => {
      const accessToken = await authenticateUser();

      const res = await chai.request(server).post('/api/members', {}).set('Authorization', `Bearer ${accessToken}`);;

      testIfNotAdmin(res);
    });

    it("should create a new member", async () => {
      const accessToken = await authenticateAdmin();

      const res = await chai
        .request(server)
        .post('/api/members', {
          name: 'Member 1',
          image: 'https://image.com/1234.png'
        })
        .set('Authorization', `Bearer ${accessToken}`);

      testIfSuccess(res);
    });

    it("should return an error if payload does not contain required fields", async () => {
      const accessToken = await authenticateAdmin();

      const res = await chai.request(server).post('/api/members', {}).set('Authorization', `Bearer ${accessToken}`);;

      testIfValidationError(res);
    });

    it("should return an error if payload does not contain a valid image url", async () => {
      const accessToken = await authenticateAdmin();

      const res = await chai
        .request(server)
        .post('/api/members', {
          name: 'Member name',
          image: 'fa4sfm2n'
        })
        .set('Authorization', `Bearer ${accessToken}`);;

      testIfValidationError(res);
    });
  });

  describe("/PUT /members/{id}", async () => {

    afterEach(async () => {
      await _deleteAllMembers();
    });

    it("should return an error if sender is not authenticated", async () => {
      const res = await chai.request(server).put('/api/members', {});

      testIfNotLogged(res);
    });

    it("should return an error if sender does not have Admin role", async () => {
      const accessToken = await authenticateUser();

      const res = await chai.request(server).put('/api/members', {}).set('Authorization', `Bearer ${accessToken}`);;

      testIfNotAdmin(res);
    });

    it("should return an error if member id is invalid", async () => {
      const accessToken = await authenticateAdmin();

      const res = await chai
        .request(server)
        .put(`/api/members/${59}`, {
          name: 'test',
          image: 'https://image.com/421',
        })
        .set('Authorization', `Bearer ${accessToken}`);;

      testIfNoResults(res);
    });

    it("should update an existing member", async () => {
      const newMember = await _createMember();
      const accessToken = await authenticateAdmin();

      const res = await chai
        .request(server)
        .put(`/api/members/${newMember.id}`, {
          name: 'Updated name',
          image: 'https://image.com/42526.png'
        })
        .set('Authorization', `Bearer ${accessToken}`);

      testIfSuccess(res);
      expect(res.body, 'Response does does not include property "result"').to.have.property('result');
      expect(res.body.result, 'Result object does not have name property').to.have.property('name');
      expect(res.body.result, 'Result object does not have image property').to.have.property('image');
    });

    it("should return an error if payload does not contain required fields", async () => {
      const accessToken = await authenticateAdmin();

      const res = await chai
        .request(server)
        .put('/api/members', {})
        .set('Authorization', `Bearer ${accessToken}`);

      testIfValidationError(res);
    });

    it("should return an error if payload does not contain a valid image url", async () => {
      const newMember = await _createMember();
      const accessToken = await authenticateAdmin();

      const res = await chai
        .request(server)
        .put(`/api/members/${newMember.id}`, {
          name: 'New name',
          image: 'gkmgnv124'
        })
        .set('Authorization', `Bearer ${accessToken}`);

      testIfValidationError(res);
    });
  });

  describe("/DELETE /members/{id}", async () => {

    afterEach(async () => {
      await _deleteAllMembers();
    });

    it("should return an error if sender is not authenticated", async () => {
      const newMember = await _createMember();

      const res = await chai.request(server).delete(`/api/members/${newMember.id}`);

      testIfNotLogged(res);
    });

    it("should return an error if sender does not have Admin role", async () => {
      const newMember = await _createMember();
      const accessToken = await authenticateUser();

      const res = await chai.request(server).delete(`/api/members/${newMember.id}`).set('Authorization', `Bearer ${accessToken}`);;

      testIfNotAdmin(res);
    });

    it("should return an error if member id is invalid", async () => {
      const accessToken = await authenticateAdmin();

      const res = await chai
        .request(server)
        .delete(`/api/members/${555}`)
        .set('Authorization', `Bearer ${accessToken}`);;

      testIfNoResults(res);
    });

    it("should delete an existing member", async () => {
      const newMember = await _createMember();
      const accessToken = await authenticateAdmin();

      const res = await chai
        .request(server)
        .delete(`/api/members/${newMember.id}`)
        .set('Authorization', `Bearer ${accessToken}`);

      testIfSuccess(res);
    });

    it("should return an empty list after deleting the only member", async () => {
      const newMember = await _createMember();
      const accessToken = await authenticateAdmin();

      const res = await chai
        .request(server)
        .delete(`/api/members/${newMember.id}`)
        .set('Authorization', `Bearer ${accessToken}`);

      const res2 = await chai
        .request(server)
        .get(`/api/members`);

      expect(res2.body.result.items, 'GET /members endpoint should return an empty list after deleting the only member').to.be.empty();
    });
  });
});

async function _deleteAllMembers() {
  await Member.destroy({
    where: {},
    force: true
  });
}

async function _createMember() {
  const now = new Date();

  const newMember = await Member.create({
    name: 'John Carter',
    image: 'https://image.com/4544.png',
    createdAt: now,
    updatedAt: now
  });

  return newMember;
}