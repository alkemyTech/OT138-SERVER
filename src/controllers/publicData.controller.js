const publicData = {
  name: "Aklemy ONG",
  image: `${process.env.FRONTEND_URL}/logo.png`,
  phone: "+54 11 4876 2158",
  address: "Cabildo 1234, CABA, Buenos Aires, Argentina",
  welcomeText: "Bienvenidos a Alkemy ONG",
  webLinks: [
    { name: "Home", url: `${process.env.FRONTEND_URL}` },
    { name: "Registro", url: `${process.env.FRONTEND_URL}/registro` },
    { name: "Login", url: `${process.env.FRONTEND_URL}/login` },
    { name: "Contacts", url: `${process.env.FRONTEND_URL}/contacts` },
    { name: "FAQ", url: `${process.env.FRONTEND_URL}/faq` },
  ],
  socialMediaLinks: [
    { name: "Linkedin", url: "https://www.linkedin.com/company/alkemy2020/" },
    { name: "Instagram", url: "https://www.instagram.com/alkemy__/" },
    { name: "Facebook", url: "https://www.facebook.com/AlkemyLATAM/" },
  ],
};

export const publicDataController = (req, res) => {
  res.json(publicData);
};
