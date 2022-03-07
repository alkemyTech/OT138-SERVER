import { Joi } from "express-validation";
import { Contacts } from "../models";
import { Op } from "sequelize";
const contactsSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string(),
  email: Joi.string().required(),
  message: Joi.string(),
});

function getJoiErrorFields(joiValidationError) {
  return joiValidationError.details.map((value) => {
    return value.context.key;
  });
}

export const createContactsController = async (req, res) => {
  const { error, value } = contactsSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    // Validation failed
    res.json({
      error: true,
      errorCode: "VAL001",
      errorFields: getJoiErrorFields(error),
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
        errorCode: "SRV001",
        status: "500",
        message:
          "An error occurred while adding contact to the database. Details: " +
          error.message,
      });
    }
  }
};
