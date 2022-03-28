"use strict";

const { faker } = require("@faker-js/faker");
faker.setLocale("es");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const news = [
      {
        name: "Jóvenes por el clima",
        content:
          '<h2>Jóvenes por el clima se unen para alertar sobre la importancia de proteger y conservar los humedales.</h2><p><strong>Buenos Aires, viernes 18 de marzo de 2022.-</strong> Somos&nbsp;Más ONG se presentará en el festival Lollapalooza una experiencia virtual para&nbsp;concientizar sobre la importancia de proteger y conservar los humedales de la Argentina.&nbsp;</p><p>Quienes se acerquen al sector "Espíritu verde" podrán&nbsp;recorrer&nbsp;un humedal de manera virtual&nbsp;y entender por qué es urgente la sanción de una ley que regule y conserve estos ecosistemas.&nbsp;La propuesta, que cuenta con el apoyo del Programa de las Naciones Unidas para el Desarrollo (PNUD), el Centro de Información de Naciones Unidas (CINU) y la Asociación Civil MINU,&nbsp;incluye charlas e interacciones con una familia de carpinchos que recorrerá el predio brindando más información sobre el tema.</p>',
        image: "https://www.theclimategroup.org/sites/default/files/styles/image_with_text_desktop/public/2021-01/shutterstock_1660865671.jpg?h=f2fcf546&itok=wOB5s4S9",
        type: "news",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Municipio por la niñez",
        content: "<h2><strong>Municipio unido por la niñez y la adolescencia (MUNA)&nbsp;</strong></h2><p>Somos Más trabaja con los gobiernos municipales para que sitúen a la niñez en el centro de sus prioridades y se comprometan a mejorar la vida de las niñas, niños y adolescentes.</p>",
        image: "https://www.news-medical.net/image.axd?picture=2016%2F3%2FChildren_playing_sunset_-_Zurijeta_8c5bdac77e44431bb1bfec67b9c87208-620x480.jpg",
        type: "news",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Andrea Becerra Nueva Tesorera ",
        content: "<h2>Andrea Becerra asume sus funciones como nueva Tesorera de Somos Más Ong&nbsp;</h2><p><strong>Buenos Aires, 1 de febrero de 2022 –</strong> Andrea Becerra asumió hoy el cargo de tesorera de <strong>Somos Más</strong>.&nbsp;</p><p>“<i>Es un honor y un privilegio incorporarme a<strong> Somos Más</strong> y contribuir a liderar su extraordinaria labor en favor de la infancia en un momento tan crucial</i>”, dijo Becerra . “<i>En una época en la que millones de niños y niñas de todo el mundo todavía están sufriendo los efectos de la pandemia de COVID y de otras crisis, <strong>Somos Más </strong>lidera el llamamiento para proteger sus derechos y su futuro. Aguardo con interés la tarea que tenemos por delante</i>”.</p>",
        image: "https://img.freepik.com/free-photo/young-businesswoman-smiling-camera_74855-1682.jpg?size=626&ext=jpg",
        type: "news",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: faker.lorem.words(3),
        content: faker.lorem.paragraph(),
        image: faker.image.imageUrl(1024, 768, "arch", true),
        type: "news",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    for (let i = 0; i < 60; i++) {
      news.push({
        name: faker.lorem.words(3),
        content: faker.lorem.paragraph(),
        image: faker.image.imageUrl(1024, 768, "arch", true),
        type: "news",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Entries", news, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Entries", null, {});
  },
};
