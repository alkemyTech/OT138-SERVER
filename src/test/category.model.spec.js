const assert = require('assert');
const { expect } = require('chai');
const { Category, Entry } = require('../models');
const { ForeignKeyConstraintError } = require('sequelize');

describe('Test Category model', function () {

    const category1Data = {
        name: 'Category1',
        description: 'Description1',
        createdAt: Date.Now
    }
    
    it(`should create a new Category`, async function () {        
        const instance = await Category.create(category1Data);
        expect(instance.name).to.equal(category1Data.name);
        expect(instance.description).to.equal(category1Data.description);
        
        // Delete db record
        await Category.destroy({ 
            where: { 
                id: instance.id
            },
            force: true
        });
    });

    it(`should update an existing Category`, async function () {        
        const instance = await Category.create(category1Data);

        const updatedFields = {
            name: 'updated',
            description: 'updated description'
        }
        
        await Category.update(updatedFields, {
            where: {
                id: instance.id
            },
        });

        const updatedInstance = await Category.findByPk(instance.id);

        expect(updatedInstance.name).to.equal(updatedFields.name);
        expect(updatedInstance.description).to.equal(updatedFields.description);
        
        // Delete db record
        await Category.destroy({ 
            where: { 
                id: instance.id
            },
            force: true
        });
    });

    it(`should soft delete a Category`, async function () {        
        const instance = await Category.create(category1Data);
        
        // Soft delete
        await Category.destroy({ 
            where: { 
                id: instance.id
            },
        });

        const {id} = await Category.findByPk(instance.id, { paranoid: false });

        expect(id).to.equal(instance.id);

        // Delete db record
        await Category.destroy({ 
            where: { 
                id: instance.id
            },
            force: true
        });
    });

});

describe('Test Entry model', function () {

    const entry1Data = {
        name: 'Entry1',
        content: 'Description for entry 1',
        createdAt: Date.Now
    }
    
    it(`should create a new Entry with a null categoryId`, async function () {        
        const instance = await Entry.create(entry1Data);

        expect(instance.name).to.equal(entry1Data.name);
        expect(instance.content).to.equal(entry1Data.content);
        expect(instance.categoryId).to.be.undefined;
        
        // Delete db record
        await Entry.destroy({ 
            where: { 
                id: instance.id
            },
            force: true
        });
    });

    it(`should not create a new Entry with an invalid categoryId`, async function () {        
        //const instance = await Entry.create({...entry1Data, categoryId: -1});

        try {
            await Entry.create({...entry1Data, categoryId: -1});
        } catch(err) {
            expect(err).to.be.instanceOf(ForeignKeyConstraintError);
            return;
        }
        expect.fail(null, null, 'Entry.create did not fail using an invalid categoryId');

    });

});