const publicData = {
  name: "Aklemy ONG",
  image: "../public/assets/logo.png", //add env variable for base url `${process.env.BASE_API_URL}/public/assets/logo.png`_
  phone: "+54 11 4876 2158",
  address: "Cabildo 1234, CABA, Buenos Aires, Argentina",
  welcomeText: "Bienvenidos a Alkemy ONG",
  webLinks: {
    home: `${process.env.FONTEND_URL}`,
    contacts: `${process.env.FONTEND_URL}/contacts`,
    faq: `${process.env.FONTEND_URL}/faq`,
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
