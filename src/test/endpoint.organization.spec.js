import { faker } from '@faker-js/faker';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const { Organization } = require('../models');
const { testIfNotLogged, testIfNotAdmin, testIfBodyValidationError, testIfNoResults, testIfSuccess } = require('./helpers/tests');
const { createUsersAndRoles, authenticateUser, authenticateAdmin } = require('./helpers/auth');
const should = chai.should();

chai.use(chaiHttp);

const USER1_EMAIL = 'testuser1@gmail.com';
const USER2_EMAIL = 'testuser2@gmail.com';
const PASSWORD = '1kAJCSkn2c91';

describe("Organization endpoints", () => {

    before(async () => {

        // Create users with differents roles

        await createUsersAndRoles();

        // Destroy all organizations on database
        await Organization.destroy({
            where: {}, 
            force: true
        })

        // Create a new organization. The id is spected to be 1 if the database is empty
        await Organization.create({
            name: "Organization name",
            phone: "123456778",
            address: "Av. Lopez 1234",
            image: "image.url",
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
    })

    describe("/GET /organizations/1/public", () => {

        it("should return a success response object if no server error", async () => {
            const res = await chai.request(server).get('api/organizations/1/public');
            testIfSuccess(res);
        })
    })

    describe("/PUT /organizations/1/public", () => {

        const data = {
            name: "Organization",
            image: "image1.org"
        }

        it("should return an error flag if the user is not logged", async () => {
            const res = await chai.request(server).put('/api/organizations/1/public').send(data);
            testIfNotLogged(res);
        })

        it("should return an error flag if the user is not an admin", async () => {
            const accessToken = await authenticateUser();
            const res = await chai.request(server).put('/api/organizations/1/public').set('Authorization', `Bearer ${accessToken}`).send(data);
            testIfNotAdmin(res);
        })

        it("should return an error flag if no content on body or if its content is not valid", async () => {
            const accessToken = await authenticateAdmin();
            const res = await chai.request(server).put('/api/organizations/1/public').set('Authorization', `Bearer ${accessToken}`).send({});
            testIfBodyValidationError(res);
        })

        it("should return a success response object if no server error", async () => {
            const accessToken = await authenticateAdmin();
            const res = await chai.request(server).put('/api/organizations/1/public').set('Authorization', `Bearer ${accessToken}`).send(data);
            testIfSuccess(res);
        })
    })
})