const sgMail = require('@sendgrid/mail');
const API_KEY = "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";
sgMail.setApiKey(API_KEY);

function MessageUser(name,email,message){

  return {
    to: email, // Change to your recipient
    from: 'colinparrado@gmail.com', // Change to your verified sender
    subject: 'Congratulations on joining ONG-AlKEMY',
    text: 'message from Ong alkemyst',
    html: `<h1> Thanks for writing to us ${name} We will answer your message soon: ${message}</h1>`,
  }

}


module.exports = {sgMail,MessageUser};
