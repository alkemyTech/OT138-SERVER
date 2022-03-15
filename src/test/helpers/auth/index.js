const { User, Role } = require('../../../models');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../app');

const USER1_EMAIL = 'testuser1@gmail.com';
const USER2_EMAIL = 'testuser2@gmail.com';
const PASSWORD = '1kAJCSkn2c91';

export const createUsersAndRoles = async () => {
    
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
}

export const authenticateUser = async () => {
    const res = await chai.request(server).post('/api/auth/login').send({ email: USER2_EMAIL, password: PASSWORD });
    return res.body.result.accessToken;
}


export const authenticateAdmin = async () => {
    const res = await chai.request(server).post('/api/auth/login').send({ email: USER1_EMAIL, password: PASSWORD });
    return res.body.result.accessToken;
}