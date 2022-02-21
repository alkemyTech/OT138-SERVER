const publicData = {
  name: "Aklemy ONG",
  image: `${process.env.FRONTEND_URL}/public/assets/logo.png`,
  phone: "+54 11 4876 2158",
  address: "Cabildo 1234, CABA, Buenos Aires, Argentina",
  welcomeText: "Bienvenidos a Alkemy ONG",
  webLinks: {
    home: `${process.env.FRONTEND_URL}`,
    contacts: `${process.env.FRONTEND_URL}/contacts`,
    faq: `${process.env.FRONTEND_URL}/faq`,
  },
  socialMediaLinks: {
    linkedin: "https://www.linkedin.com/company/alkemy2020/",
    instagram: "https://www.instagram.com/alkemy__/",
    facebook: "https://www.facebook.com/AlkemyLATAM/",
  },
};

export const publicDataController = (req, res) => {
  res.json(publicData);
};
