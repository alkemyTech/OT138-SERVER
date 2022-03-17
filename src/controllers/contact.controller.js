import { Contacts } from "../models";
import { paginate } from "../helpers";
import { InvalidArgumentsError } from "../helpers/exceptions";
import { Joi } from "express-validation";
import { getJoiErrorFields } from "../helpers";

/**
 * Returns a list of contacts
 */
export const list = async (req, res) => {
  try {
    const contacts = await paginate(Contacts, req.query.limit, req.query.page, [
      ["createdAt", "DESC"],
    ]);
    return res.status(200).json({
      error: false,
      status: "200",
      result: contacts,
    });
  } catch (err) {
    let resData = {};
    if (err instanceof InvalidArgumentsError) {
      resData = {
        error: true,
        errorCode: "REQ002",
        status: "400",
        message: err.message,
      };
    } else {
      console.log(err);
      resData = {
        error: true,
        errorCode: "SRV001",
        status: "500",
        message: "Internal error",
      };
    }
    return res.status(200).json(resData);
  }
};

/**
 * Creates a contact
 */
const contactsSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string(),
  email: Joi.string().required(),
  message: Joi.string(),
});

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
