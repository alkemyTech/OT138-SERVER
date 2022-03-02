import { Joi } from "express-validation";
import { Contacts } from "../models";
import { Op } from "sequelize";
const contactsSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string(),
  email: Joi.string().required(),
  message: Joi.string(),
});
export const createContactsController = async (req, res) => {
  console.log("create contacts");
  const { error, value } = contactsSchema.validate(req.body);
  if (error) {
    // Validation failed
    res.json({
      error: true,
      status: "400",
      message: error.message,
    });
  } else {
    // Validation success
    try {
      const contact = await Contacts.create(value);
      res.json({
        error: false,
        status: "200",
        message: "Contact created correctly.",
      });
    } catch (error) {
      console.log(error);
      res.json({
        error: true,
        status: "500",
        message:
          "An error occurred while adding contact to the database. Details: " +
          error.message,
      });
    }
  }
};
