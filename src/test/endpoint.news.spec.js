import { faker } from '@faker-js/faker';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const { Entry, Category } = require('../models');
const { testIfNotLogged, testIfNotAdmin, testIfValidationError, testIfNoResults, testIfSuccess } = require('./helpers/tests');
const { createUsersAndRoles, authenticateUser, authenticateAdmin } = require('./helpers/auth');
const should = chai.should();

chai.use(chaiHttp);

const USER1_EMAIL = 'testuser1@gmail.com';
const USER2_EMAIL = 'testuser2@gmail.com';
const PASSWORD = '1kAJCSkn2c91';

describe("News endpoint", async () => {

  let categoryId;

  before(async () => {

    await Entry.destroy({
      where: {},
      force: true
    });

    await Category.destroy({
      where: {},
      force: true
    });

    const category = await Category.create({
      name: 'CategoriaPrueba',
      description: 'Descripcion',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    categoryId = category.id;

    await createUsersAndRoles();
  });

  after(async () => {
    await Entry.destroy({
      where: {},
      force: true
    });

    await Category.destroy({
      where: {},
      force: true
    });

  });

  describe("/POST news", () => {

    it("should return an error flag if access token is not provided", async () => {
      const res = await chai.request(server).post('/api/news');
      testIfNotLogged(res);
    });

    it("should return an error flag if logged user is not an admin", async () => {
      const accessToken = await authenticateUser();
      const res = await chai.request(server).post('/api/news').set('Authorization', `Bearer ${accessToken}`);
      testIfNotAdmin(res);
    });

    it("should return an error flag if name, categoryId, image or content is not send on the request body", async () => {
      const accessToken = await authenticateAdmin();
      const res = await chai.request(server).post('/api/news').set('Authorization', `Bearer ${accessToken}`).send({});
      testIfValidationError(res);
    });

    it("should return an success flag if there is no server error", async () => {
      const accessToken = await authenticateAdmin();

      const res = await chai.request(server).post('/api/news').set('Authorization', `Bearer ${accessToken}`).send({
        name: faker.lorem.lines(),
        content: faker.lorem.paragraph(),
        image: faker.image.abstract(),
        type: 'news',
        categoryId: categoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      testIfSuccess(res);
    })
  })

  describe("/PUT /news", () => {
    let route = '/api/news';

    const body = {
      name: 'name',
      categoryId: categoryId,
      type: 'news',
      image: 'url.com',
      content: 'content',
    }

    it("should return an error flag if user is not authenticated", async () => {
      const res = await chai.request(server).put(`${route}/1`).send(body);
      testIfNotLogged(res);
    })

    it("should return an error flag if the user is not an admin", async () => {
      const accessToken = await authenticateUser();
      const res = await chai.request(server).put(`${route}/1`).set('Authorization', `Bearer ${accessToken}`).send(body);
      testIfNotAdmin(res);
    })

    it("should return an error flag if the entry does not exist", async () => {
      const accessToken = await authenticateAdmin();
      const res = await chai.request(server).put(`${route}/5`).set('Authorization', `Bearer ${accessToken}`).send(body);
      testIfNoResults(res);
    })

    it("should return an error flag if data in body is not valid or is missing", async () => {
      const accessToken = await authenticateAdmin();
      const res = await chai.request(server).put(`${route}/1`).set('Authorization', `Bearer ${accessToken}`).send({});
      testIfValidationError(res);
    })

    it("should return an success response object if no error", async () => {
      const accessToken = await authenticateAdmin();
      const res = await chai.request(server).put(`${route}/1`).set('Authorization', `Bearer ${accessToken}`).send(body);
      testIfSuccess(res);
    })
  })

  describe("/DELETE /news/{id}", () => {
    let route = '/api/news'
    it("should return an error flag if user is not authenticated", async () => {
      const res = await chai.request(server).delete(`${route}/1`);
      testIfNotLogged(res);
    })

    it("should return an error flag if the user is not an admin", async () => {
      const accessToken = await authenticateUser();
      const res = await chai.request(server).delete(`${route}/1`).set('Authorization', `Bearer ${accessToken}`);
      testIfNotAdmin(res);
    })

    it("should return an error flag if the entry does not exist", async () => {
      const accessToken = await authenticateAdmin();
      const res = await chai.request(server).delete(`${route}/5`).set('Authorization', `Bearer ${accessToken}`);
      testIfNoResults(res);
    })

    it("should return an success response object if no error", async () => {
      const accessToken = await authenticateAdmin();
      const res = await chai.request(server).delete(`${route}/1`).set('Authorization', `Bearer ${accessToken}`).send({
        name: 'name',
        categoryId: categoryId,
        type: 'news',
        image: 'url.com',
        content: 'content',
      });
      testIfSuccess(res);
    })
  })

  describe("GET /news/{id}", () => {

    let route = '/api/news';

    it("should return an error flag if the entry does not exist", async () => {
      const res = await chai.request(server).get(`${route}/5`);
      testIfNoResults(res);
    })

    it("should return an success response object if no error", async () => {
      const res = await chai.request(server).get(`${route}/1`)
      testIfSuccess(res);
    })

  });

  describe("GET /news", () => {
    let route = '/api/news';

    it("should return an success response object if no error", async () => {
      const accessToken = await authenticateAdmin();
      const res = await chai.request(server).get(route);
      testIfSuccess(res);
    })
  })
});