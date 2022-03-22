const sgMail = require("@sendgrid/mail");
const API_KEY = process.env.API_KEY;
const { ContactForm, FormRegister } = require("../Templates/sendGrid");
sgMail.setApiKey(API_KEY);

function Message1(name, email, message) {
  return {
    to: email, // Change to your recipient
    from: "colinparrado@gmail.com", // Change to your verified sender
    subject: "Gracias por Contactarnos - Somos Más ONG",
    text: message,
    html: ContactForm(name),
  };
}

function Message2(email) {
  return {
    to: email, // Change to your recipient
    from: "colinparrado@gmail.com", // Change to your verified sender
    subject: "Bienvenido/a a la Comunidad - Somos Más ONG",
    html: FormRegister(),
  };
}

module.exports = { sgMail, Message1, Message2 };
