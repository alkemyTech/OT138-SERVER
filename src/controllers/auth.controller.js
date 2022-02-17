import bcrypt from "bcryptjs";
import { Joi } from "express-validation";
import { User } from "../models";

export const registerValidation = {
  body: Joi.object({
    firstName: Joi.string()
      .regex(/[a-zA-Z0-9]{3,50}/)
      .required(),
    lastName: Joi.string()
      .regex(/[a-zA-Z0-9]{3,50}/)
      .required(),
    email: Joi.string()
      .email()
      .regex(/[a-zA-Z0-9]{3,50}/)
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,50}/)
      .required(),
  }),
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    }).then(async (response) => {
      const { id } = response[0];
      !response[1]
        ? res.status(200).json({
            error: true,
            status: "409",
            message: "The user already exists.",
            user: null,
          })
        : res.status(200).json({
            error: true,
            status: "200",
            message: "The user was created successfully.",
            user: {
              id,
              firstName,
              lastName,
              email,
            },
          });
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: true,
      status: "500",
      message: "An error occurred while creating the User.",
      content: error,
    });
  }
};
