import { faker } from '@faker-js/faker';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const { User, Role, Entry } = require('../models');
const should = chai.should();

chai.use(chaiHttp);

const USER1_EMAIL = 'testuser1@gmail.com';
const USER2_EMAIL = 'testuser2@gmail.com';
const PASSWORD = '1kAJCSkn2c91';

describe("News endpoint", async () => {

    before(async () => {
        await Entry.destroy({
            where: {},
            force: true
        })
        await User.destroy({
            where: {},
            force: true
        });

        await Role.destroy({
            where: {},
            force: true
        });

        // Create Admin role
        const role1 = await Role.create({
            name: 'Admin'
        });

        // Create Standard role
        const role2 = await Role.create({
            name: 'Standard'
        });

        // Create a new user Admin using the register endpoint
        await chai.request(server).post('/api/auth/register').send({
            firstName: 'User1',
            lastName: 'Test',
            email: USER1_EMAIL,
            password: PASSWORD
        });

        // Set Admin role to the new user
        await User.update(
            { roleId: role1.id },
            { where: { email: USER1_EMAIL } }
        );

        // Create a new Standard user using the register endpoint
        await chai.request(server).post('/api/auth/register').send({
            firstName: 'User2',
            lastName: 'Test',
            email: USER2_EMAIL,
            password: PASSWORD
        });

        // Set Admin role to the new user
        await User.update(
            { roleId: role2.id },
            { where: { email: USER2_EMAIL } }
        );

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
            testIfBodyValidationError(res);
        });

        it("should return an success flag if there is no server error", async () => {
            const accessToken = await authenticateAdmin();
            const res = await chai.request(server).post('/api/news').set('Authorization', `Bearer ${accessToken}`).send({
                name: faker.lorem.lines(),
                content: faker.lorem.paragraph(),
                image: faker.image.abstract(),
                type: 'news',
                categoryId: 1,
                createdAt: Date.now(),
                updatedAt: Date.now()
            });
            testIfSuccess(res);
        })        
    })
    
    describe("/GET backoffice/news", () => {
        let route = '/api/backoffice/news';
        it("should return an error flag if user is not authenticated", async () => {
            const res = await chai.request(server).get(route);
            testIfNotLogged(res);
        })
        
        it("should return an error flag if the user is not an admin", async () => {
            const accessToken = await authenticateUser();
            const res = await chai.request(server).get(route).set('Authorization', `Bearer ${accessToken}`);
            testIfNotAdmin(res);
        })

        it("should return a success response object if not error", async () => {
            const accessToken = await authenticateAdmin();
            const res = await chai.request(server).get(route).set('Authorization', `Bearer ${accessToken}`);
            testIfSuccess(res);
        })
    })

    describe("/PUT /news", () => {
        let route = '/api/news';

        const body = {
            name: 'name',
            categoryId: 1,
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
            testIfBodyValidationError(res);
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
                categoryId: 1,
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
            console.log(res.body);
            testIfNoResults(res);
        })

        it("should return an success response object if no error", async () => {
            const res = await chai.request(server).get(`${route}/1`)
            testIfSuccess(res);
        })

    })



    describe("GET /news", () => {
        let route = '/api/news';
        
        it("should return an success response object if no error", async () => {
            const accessToken = await authenticateAdmin();
            const res = await chai.request(server).get(route);
            testIfSuccess(res);
        })
        
        before(async () => {
            await Entry.destroy({
                where: {},
                force: true
            })
        })
        
        it("should return an error flag if no results found", async () => {
            const res = await chai.request(server).get(route);
            console.log(res.body)
            testIfNoResults(res)
        })

    })
});

async function authenticateUser() {
    const res = await chai.request(server).post('/api/auth/login').send({ email: USER2_EMAIL, password: PASSWORD });
    return res.body.result.accessToken;
}

async function authenticateAdmin(){
    const res = await chai.request(server).post('/api/auth/login').send({ email: USER1_EMAIL, password: PASSWORD });
    return res.body.result.accessToken;
}

const testIfNotLogged = (res) => {
    errorFlag(res, "AUT001", "401");
}

const testIfNotAdmin = (res) => {
    errorFlag(res, "AUT002", "403");
}

const testIfBodyValidationError = (res) => {
    errorFlag(res, "VAL001", "400");
}

const testIfNoResults = (res) => {
    errorFlag(res, "REQ001", "404");
}

const testIfParamsValidationError = (res) => {
    errorFlag(res, "REQ002", "400");
}

const testIfSuccess = (res) => {
    it("should return an success response object if no error", async () => {
        res.should.be.a('object');
        res.status.should.be.equal(200);
        res.body.should.have.property("error");
        res.body.should.have.property("status");
        res.body.error.should.be.equal(false);
    })
}

const errorFlag = (res, errorCode, status) => {
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