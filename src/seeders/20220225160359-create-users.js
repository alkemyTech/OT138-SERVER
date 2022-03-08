"use strict";

const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
faker.setLocale("es");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const emailList = [
      "myrl.wiza@yahoo.com",
      "tina.stanton@yahoo.com",
      "calista_ferry@yahoo.com",
      "emily81@hotmail.com",
      "mario.thompson64@yahoo.com",
      "jaren_balistreri@gmail.com",
      "carolina_russel2@yahoo.com",
      "dorian.rutherford57@hotmail.com",
      "daisha_kuphal@gmail.com",
      "ruthe50@hotmail.com",
      "aletha_kilback@hotmail.com",
      "modesto74@gmail.com",
      "corene.langworth@yahoo.com",
      "cecelia_hickle@yahoo.com",
      "caesar99@yahoo.com",
      "alexander_jast6@gmail.com",
      "marty84@hotmail.com",
      "camylle.dooley@gmail.com",
      "easter.denesik20@hotmail.com",
      "manley_vonrueden59@gmail.com",
    ];

    const hashedPassword = await bcrypt.hash("test1234", 12);

    const toInsert = [];

    for (let i = 0; i < 20; i++) {
      toInsert.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: emailList.pop(),
        password: hashedPassword,
        image: faker.image.avatar(),
        roleId: i < 10 ? null : 1, // 10 users with null role and 10 users with role id 1
        createdAt: faker.date.past(2),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Users", toInsert, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
