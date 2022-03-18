import { faker } from '@faker-js/faker';
import { expect } from 'chai';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const { testimony } = require("../models");
const { testIfSuccess, testIfNoResults, standardResponseTest } = require('./helpers/tests');
const { authenticateAdmin } = require('./helpers/auth');
chai.use(chaiHttp)





describe("TESTIMONIAL ENDPOINT TESTING", () => {

  before(async () => {


    await testimony.destroy({
      where: {},
      force: true
    })


    await testimony.create({
      name: "Organization name",
      image: "123456778",
      content: "Av. Lopez 1234",
      image: "image.url",
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
  })



  describe("GET", () => {


    let route = '/api/testimonials';

    it("Get all testimonials", async () => {
      const response = await chai.request(server).get(route);
      testIfSuccess(response)
      //chai.assert.equal(response.body.error,false)
    });


    it("It is validated that the ID does not exist", async () => {
      const response = await chai.request(server).get(`${route}/48456`);
      testIfNoResults(response);
    })


    it("It is validated that the ID does exist", async () => {
      const response = await chai.request(server).get(`${route}/1`);
      expect(response.body.error).to.equal(false);
      expect(response.body.errorCode).to.equal("");

    })


  })



  describe("POST", () => {

    let route = '/api/testimonials';

    const dataError = {
      name: "Yosip Mike Colin",
      image: "URl1fdsdsf",
    }

    const dataSucces = {
      name: "Yosip Mike Colin",
      image: "URl1fdsdsf",
      content: "Me gusta ayudar a los demas"
    }


    it("Validating that no data is received", async () => {
      const response = await chai.request(server).post(route).send({});
      standardResponseTest(response, true);
      expect(response.body.errorCode).to.equal("REQ002");
    })


    it("Validating that it does receive data", async () => {
      const response = await chai.request(server).post(route).send(dataSucces);
      expect(response.body.error).to.equal(false);
      expect(response.body.errorCode).to.equal("");
    })


    it("Validating that you receive incorrect data", async () => {
      const response = await chai.request(server).post(route).send(dataError);
      expect(response.body.error).to.equal(true);
      expect(response.body.errorCode).to.equal("REQ002");
    })


  })




  describe("PUT", () => {

    let route = '/api/testimonials';

    const dataError = {
      name: "Yosip Mike Colin",
      image: "URl1fdsdsf",
    }

    const dataSucces = {
      name: "Yosip Mike Colin",
      image: "URl1fdsdsf",
      content: "Me gusta ayudar a los demas"
    }

    it("Validate that they do not receive any data", async () => {
      const response = await chai.request(server).put(`${route}/1`).send({});
      standardResponseTest(response, true);
    })



    it("Validate receive do not receive bad data", async () => {
      const response = await chai.request(server).put(`${route}/1`).send(dataError);
      standardResponseTest(response, true);
      expect(response.body.errorCode).to.equal("REQ002");
    })


    it("Validate receive the corresponding data", async () => {
      const response = await chai.request(server).put(`${route}/1`).send(dataSucces);
      standardResponseTest(response, false);
      expect(response.body.errorCode).to.equal("");
    })

  });




  describe("DELETE", () => {

    let route = '/api/testimonials';

    it("Validate that the ID is incorrect", async () => {
      const response = await chai.request(server).delete(`${route}/999`);
      expect(response.body.error).to.equal(true);
      expect(response.body.errorCode).to.equal("REQ001");
    });


    it("Validate that the ID does exist", async () => {
      const response = await chai.request(server).delete(`${route}/1`);
      expect(response.body.error).to.equal(false);
      expect(response.body.errorCode).to.equal("");
    })


  });


})