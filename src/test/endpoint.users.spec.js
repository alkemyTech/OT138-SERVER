const { expect, assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const { User, Role } = require('../models');
import {
  testIfValidationError,
  testIfBadRequest,
  standardResponseTest,
  testIfNotLogged,
  testIfNotAdmin,
  testIfSuccess,
  testIfNoResults
} from './helpers/tests';

chai.use(chaiHttp);

describe('User endpoints', async () => {
    const USER1_EMAIL = 'testuser1@gmail.com';
    const USER2_EMAIL = 'testuser2@gmail.com';
    const PASSWORD = '1kAJCSkn2c91';

    // Remove all users
    before(async () => {
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

    // Clean up after completing tests
    after(async () => {
        await User.destroy({
            where: {},
            force: true
        });

        await Role.destroy({
            where: {},
            force: true
        });
    });

    // Test /GET route
    describe('/GET users', () => {

        //Test with anonymous user
        it('it should return an error response if not authenticated', async () => {
            const res = await chai.request(server).get('/api/users')

            testIfNotLogged(res);
        });

        //Test with authenticated user with Standard role
        it('it should return an error response if authenticated user does not have Admin role', async () => {

            let res;

            // Login with standard user credentials
            const accessToken = await authenticateUser(USER2_EMAIL, PASSWORD);

            // Append token to request header
            res = await chai.request(server).get('/api/users').set('Authorization', `Bearer ${accessToken}`);

            testIfNotAdmin(res);
        });

        //Test with authenticated user with Admin role
        it('it should return the list of users if authenticated user has Admin role', async () => {

            let res;

            // Login with admin user credentials
            const accessToken = await authenticateUser(USER1_EMAIL, PASSWORD);

            // Append token to request header
            res = await chai.request(server).get('/api/users').set('Authorization', `Bearer ${accessToken}`);

            testIfSuccess(res);
            res.body.result.should.be.a('array');
            expect(res.body.result, 'Result should contain 2 items').to.have.lengthOf(2);
        });

        it('it should return a list of users without password field', async () => {
            let res;

            // Login with admin user credentials
            const accessToken = await authenticateUser(USER1_EMAIL, PASSWORD);

            // Append token to request header
            res = await chai.request(server).get('/api/users').set('Authorization', `Bearer ${accessToken}`);

            res.body.result.forEach(user => {
                expect(user, 'Users should not include the password field in the response').to.not.have.property('password');
            });
        });
    });

    describe('/DELETE users/{id}', () => {

        //Test with anonymous user
        it('it should return an error response if not authenticated', async () => {
            const res = await chai.request(server).delete('/api/users/5');

            testIfNotLogged(res);
        });

        //Test with authenticated user with Standard role
        it('it should return an error response if authenticated user does not have Admin role', async () => {

            let res;

            // Login with standard user credentials
            const accessToken = await authenticateUser(USER2_EMAIL, PASSWORD);

            // Append token to request header
            res = await chai.request(server).delete('/api/users/5').set('Authorization', `Bearer ${accessToken}`);

            testIfNotAdmin(res);
        });

        //Test with authenticated user with Admin role
        it('it should delete a user if authenticated user has Admin role', async () => {
            let res;

            const newUsers = await User.bulkCreate([
                {
                    email: 'test001@gmail.com',
                    password: PASSWORD,
                },
                {
                    email: 'test002@gmail.com',
                    password: PASSWORD,
                },
                {
                    email: 'test003@gmail.com',
                    password: PASSWORD,
                },
                {
                    email: 'test004@gmail.com',
                    password: PASSWORD,
                }
            ]);

            // Delete the 2nd new user
            const idToDelete = newUsers[1].dataValues.id;

            // Authenticate  with admins user credentials
            const accessToken = await authenticateUser(USER1_EMAIL, PASSWORD);

            const usersBeforeDelete = await User.findAll();

            res = await chai.request(server).delete(`/api/users/${idToDelete}`).set('Authorization', `Bearer ${accessToken}`);

            testIfSuccess(res);

            const usersAfterDelete = await User.findAll();

            // Test if user was deleted correctly
            expect(usersAfterDelete.length).to.be.equal(usersBeforeDelete.length - 1, 'User was not deleted');

            // Find user including deleted ones
            const deletedUser = await User.findOne({
                where: {
                    id: idToDelete
                },
                paranoid: false
            });

            // Test if user was soft-deleted
            expect(deletedUser, 'User was removed from database without soft delete').to.not.be.null;
        });

        //Test with authenticated user with Admin role on previously deleted userId
        it('it should return an error response if user was previously deleted', async () => {
            let res;

            // Authenticate  with admins user credentials
            const accessToken = await authenticateUser(USER1_EMAIL, PASSWORD);

            // Create a new user
            const newUser = await User.create({
                email: 'test323@gmail.com',
                password: PASSWORD
            });

            // Delete newUser using endpoint
            res = await chai.request(server).delete(`/api/users/${newUser.id}`).set('Authorization', `Bearer ${accessToken}`);

            // Try to delete newUser again
            res = await chai.request(server).delete(`/api/users/${newUser.id}`).set('Authorization', `Bearer ${accessToken}`);

            testIfNoResults(res);
        });

        //Test with authenticated user with Admin role on invalid userId
        it('it should return an error response if user id is invalid', async () => {
            let res;

            const data = await User.findAll();

            // Authenticate  with admins user credentials
            const accessToken = await authenticateUser(USER1_EMAIL, PASSWORD);

            // Try deleting an invalid id
            res = await chai.request(server).delete(`/api/users/hafsf`).set('Authorization', `Bearer ${accessToken}`);

            testIfBadRequest(res);
        });
    });

});

async function authenticateUser(email, password) {
    const res = await chai.request(server).post('/api/auth/login').send({ email, password });
    return res.body.result.accessToken;
}