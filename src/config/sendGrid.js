const sgMail = require('@sendgrid/mail');
const API_KEY = "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";
const  {ContactForm} = require("../Templates/sendGrid");
sgMail.setApiKey(API_KEY);

function MessageUser(name,email,message){

  return {
    to: email, // Change to your recipient
    from: 'colinparrado@gmail.com', // Change to your verified sender
    subject: 'Congratulations on joining ONG-AlKEMY',
    text: message,
    html: ContactForm(name),
  }

}


module.exports = {sgMail,MessageUser};
