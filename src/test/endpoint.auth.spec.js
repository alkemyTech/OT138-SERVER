const { expect, assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const { User, Role } = require('../models');

chai.use(chaiHttp);

describe('Auth endpoints', async () => {
    describe('/POST register', () => {

        beforeEach(async () => {
            await User.destroy({
                where: {},
                force: true
            });
        });

        it('it should return an error flag if no fields are sent in the request', async () => {
            let res;
            res = await chai.request(server).post('/api/auth/register').send({});

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(true);
            expect(res.body, 'Response body should include the property "errorCode"').to.have.property('errorCode');
            expect(res.body.errorCode, 'errorCode should be VAL001').to.equal('VAL001');
        });

        it('it should return an error flag if firstName and lastName fields are not sent in the request', async () => {
            let res;
            res = await chai.request(server).post('/api/auth/register').send({
                email: 'test1@yahoo.com.ar',
                password: '12345'
            });

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(true);
            expect(res.body, 'Response body should include the property "errorCode"').to.have.property('errorCode');
            expect(res.body.errorCode, 'errorCode should be VAL001').to.equal('VAL001');
        });

        it('it should create a new user', async () => {
            let res;
            res = await chai.request(server).post('/api/auth/register').send({
                firstName: 'Test',
                lastName: 'test',
                email: 'test1@yahoo.com.ar',
                password: 'abc123456'
            });

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to false').to.equal(false);
        });

        it('it should return an error flag if an user with the same email exists in the database', async () => {
            let res;
            res = await chai.request(server).post('/api/auth/register').send({
                firstName: 'Test',
                lastName: 'test',
                email: 'test1@yahoo.com.ar',
                password: 'abc123456'
            });

            res = await chai.request(server).post('/api/auth/register').send({
                firstName: 'Test2',
                lastName: 'Dup',
                email: 'test1@yahoo.com.ar',
                password: 'abc2223333444'
            });

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(true);
            expect(res.body, 'Response body should include the property "errorCode"').to.have.property('errorCode');
            expect(res.body.errorCode, 'errorCode should be REQ002').to.equal('REQ002');
        });

        it('it should return an error flag if the email field is not a valid email', async () => {
            let res;
            res = await chai.request(server).post('/api/auth/register').send({
                firstName: 'Test',
                lastName: 'test',
                email: 'test1',
                password: 'abc123456'
            });

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(true);
            expect(res.body, 'Response body should include the property "errorCode"').to.have.property('errorCode');
            expect(res.body.errorCode, 'errorCode should be VAL001').to.equal('VAL001');
        });
    });

    describe('/POST login', () => {
        const EMAIL = "testuser@gmail.com";
        const PASSWORD = "cnmKCJ23cn34";

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
                where: {},
                force: true
            });
        });

        it('it should return an error flag if required fields are not sent in the request', async () => {
            let res;
            res = await chai.request(server).post('/api/auth/login').send({});

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(true);
            expect(res.body, 'Response body should include the property "errorCode"').to.have.property('errorCode');
            expect(res.body.errorCode, 'errorCode should be VAL001').to.equal('VAL001');
        });

        it('it should return an error flag if the email is not valid', async () => {
            let res;
            res = await chai.request(server).post('/api/auth/login').send({
                email: 'john1@outlook.com',
                password: "Password1234",
            });

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(true);
            expect(res.body, 'Response body should include the property "errorCode"').to.have.property('errorCode');
            expect(res.body.errorCode, 'errorCode should be REQ002').to.equal('REQ002');
        });

        it('it should return an error flag if the email is valid but the password is incorrect', async () => {
            let res;
            res = await chai.request(server).post('/api/auth/login').send({
                email: EMAIL,
                password: "Password1234",
            });

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(true);
            expect(res.body, 'Response body should include the property "errorCode"').to.have.property('errorCode');
            expect(res.body.errorCode, 'errorCode should be REQ002').to.equal('REQ002');
        });

        it('it should authenticate the user with valid credentials', async () => {
            let res;
            res = await chai.request(server).post('/api/auth/login').send({
                email: EMAIL,
                password: PASSWORD,
            });

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to tfalserue').to.equal(false);
        });

        it('it should authenticate the user and return access and refresh tokens', async () => {
            let res;
            res = await chai.request(server).post('/api/auth/login').send({
                email: EMAIL,
                password: PASSWORD,
            });

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to tfalserue').to.equal(false);
            expect(res.body, 'Response does does not include property "accessToken"').to.have.property('accessToken');
            expect(res.body, 'Response does not include property "refreshToken"').to.have.property('refreshToken');
            expect(res.body.accessToken, 'accessToken should be a string').to.be.a('string');
            expect(res.body.refreshToken, 'refreshToken should be a string').to.be.a('string');
        });
    });

    describe('/POST imLoggedIn', () => {
        const EMAIL = "testuser@gmail.com";
        const PASSWORD = "cnmKCJ23cn34";

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
                where: {},
                force: true
            });
        });

        it('it should return an error flag if user is not authenticated', async () => {
            const res = await chai.request(server).post('/api/auth/imloggedin');

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(true);
            expect(res.body, 'Response body should include the property "errorCode"').to.have.property('errorCode');
            expect(res.body.errorCode, 'errorCode should be AUT001').to.equal('AUT001');
        });

        it('it should return an error flag if the token is invalid', async () => {
            const res = await chai.request(server).post('/api/auth/imloggedin').set('Authorization', `Bearer ${"amasklcasm"}`);

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(true);
            expect(res.body, 'Response body should include the property "errorCode"').to.have.property('errorCode');
            expect(res.body.errorCode, 'errorCode should be AUT001').to.equal('AUT001');
        });

        it('it should return user data if the access token is valid', async () => {
            const accessToken = await authenticateUser(EMAIL, PASSWORD);
            const res = await chai.request(server).post('/api/auth/imloggedin').set('Authorization', `Bearer ${accessToken}`);

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(false);
            expect(res.body, 'Response body should include the property "user"').to.have.property('user');
        });
    });

    describe('/POST logout', () => {
        const EMAIL = "testuser@gmail.com";
        const PASSWORD = "cnmKCJ23cn34";

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
                where: {},
                force: true
            });
        });

        it('it should return an error flag if user is not authenticated', async () => {
            const res = await chai.request(server).post('/api/auth/logout');

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(true);
            expect(res.body, 'Response body should include the property "errorCode"').to.have.property('errorCode');
            expect(res.body.errorCode, 'errorCode should be AUT001').to.equal('AUT001');
        });

        it('it should return a successful response if the user is authenticated', async () => {
            const accessToken = await authenticateUser(EMAIL, PASSWORD);
            const res = await chai.request(server).post('/api/auth/logout').set('Authorization', `Bearer ${accessToken}`);

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(false);
        });
    });

    describe('/GET me', () => {
        const EMAIL = "testuser@gmail.com";
        const PASSWORD = "cnmKCJ23cn34";

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
                where: {},
                force: true
            });
        });

        it('it should return an error flag if the user is not authenticated', async () => {
            const res = await chai.request(server).get('/api/auth/me');

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(true);
            expect(res.body, 'Response body should include the property "errorCode"').to.have.property('errorCode');
            expect(res.body.errorCode, 'errorCode should be AUT001').to.equal('AUT001');
        });

        it('it should return the user profile data if the user is authenticated', async () => {
            const accessToken = await authenticateUser(EMAIL, PASSWORD);
            const res = await chai.request(server).get('/api/auth/me').set('Authorization', `Bearer ${accessToken}`);

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(false);
        });
    });

    describe('/POST refresh', () => {
        const EMAIL = "testuser@gmail.com";
        const PASSWORD = "cnmKCJ23cn34";

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
                where: {},
                force: true
            });
        });

        it('it should return an error flag if the request body does not contain a refreshToken property', async () => {
            const res = await chai.request(server).post('/api/auth/refresh').send({});

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to true').to.equal(true);
            expect(res.body, 'Response body should include the property "errorCode"').to.have.property('errorCode');
            expect(res.body.errorCode, 'errorCode should be REQ002').to.equal('REQ002');
        });

        it('it should return a new access token', async () => {
            let res;
            res = await chai.request(server).post('/api/auth/login').send({ email: EMAIL, password: PASSWORD });
            const { refreshToken } = res.body;
            
            res = await chai.request(server).post('/api/auth/refresh').send({ refreshToken: refreshToken });

            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body, 'Response body should be an object').to.be.a('object');
            expect(res.body, 'Response body should include the property "error"').to.have.property('error');
            expect(res.body.error, 'error should be set to false').to.equal(false);
            expect(res.body, 'Response body should include the property "accessToken"').to.have.property('accessToken');
        });

        it('it should let a user access a protected endpoint with a new access token', async () => {
            let res;
            res = await chai.request(server).post('/api/auth/login').send({ email: EMAIL, password: PASSWORD });
            const { refreshToken } = res.body;
            
            res = await chai.request(server).post('/api/auth/refresh').send({ refreshToken: refreshToken });
            const { accessToken } = res.body;
            
            res = await chai.request(server).post('/api/auth/imloggedin').set('Authorization', `Bearer ${accessToken}`);
            expect(res.status, 'Status code should be 200').to.equal(200);
            expect(res.body.error, 'error should be set to false').to.equal(false);
        });
    });
});

async function authenticateUser(email, password) {
    const res = await chai.request(server).post('/api/auth/login').send({ email, password });
    return res.body.accessToken;
}